import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {CaseRecordApiResponse} from "../domain/case.record.api.response";
import {CaseRecord} from "../domain/case.record";
import {ChronologicalCaseRecord} from "../domain/chronological.case.record";
import {Annotation} from "../domain/annotation";
import {Question} from "../domain/question";
import {DemoModeService} from "./demo-mode.service";
import {EnvironmentHandlerService} from "./environment-handler.service";

@Injectable({
  providedIn: 'root'
})

export class CaseRecordsService {

  caseRecordChronologicalData:  ChronologicalCaseRecord [] = [];
  caseRecordChronologicalData$: BehaviorSubject<ChronologicalCaseRecord []>;

  caseRecordChronologicalDataStored:  ChronologicalCaseRecord [] = [];
  caseRecordChronologicalDataStored$: BehaviorSubject<ChronologicalCaseRecord []>;

  private demographicsData =  new Subject<any>;
  public demographicsData$ = this.demographicsData.asObservable();

  private headerData =  new Subject<any>;
  public headerData$ = this.headerData.asObservable();


  sections: string[] = [];
  sections$: BehaviorSubject<string[]>;

  baseApiUrl: string;
  selectedCaseRecord$: BehaviorSubject<any>;

  constructor(private http: HttpClient, private demoModeService: DemoModeService, private environmentHandler: EnvironmentHandlerService) {
    this.caseRecordChronologicalData$ = new BehaviorSubject(this.caseRecordChronologicalData);
    this.caseRecordChronologicalDataStored$ = new BehaviorSubject(this.caseRecordChronologicalDataStored);
    this.sections$ = new BehaviorSubject(this.sections);
    this.selectedCaseRecord$ = new BehaviorSubject(this.sections);
    this.baseApiUrl = this.environmentHandler.getBaseApiURL();

    this.demoModeService.latestDate$.subscribe({
      next: latestDate => {
        if(latestDate) {
          this.filterLatestDateData(latestDate, this.caseRecordChronologicalDataStored$.value)
        }
      }
    });
  }

  setCustomHeaderData(data) {
    let result = [];
    data.forEach(outerItem => {
      const question = outerItem.question;
      // per requirements uniques is determined by outerItem.question AND outerItem.category, we construct the string temporary for parsing
      const uniqueStr = outerItem.question + outerItem.category;
      const uniqueFlag = result.some(obj => obj['uniqueStr']);
      if(uniqueFlag){
        const inner = {
          date: new Date(outerItem.date),
          display: outerItem.derivedValue.coding.display,
        }
        result.forEach(el => {
          if(el.label == question){
            el.dateEntries.push(inner);
            // after every push we want to make sure the data is sorted by date in desc order.
            el.dateEntries.sort((a, b) => b.date - a.date);
          }
        })
      }
      else{
        const inner = {
          date: new Date(outerItem.date),
          display: outerItem.derivedValue.coding.display,
        }
        const item = {
          label: question,
          dateEntries : [inner],
          display: outerItem.derivedValue.coding.display,
          uniqueStr: uniqueStr // we use this value only to determine uniqueness
        }
        result.push(item);
      }
      // The display for the other item is equivalent of the display of the first inner item.
      // The first inner item is the last chronologically occurrence because the inner items are sorted by date in desc order
      result = result.map(item=> ({...item, display: item.dateEntries[0].display}));
    });
    result = result.map(item=> { delete item.uniqueStr; return item }); //we don't need the unique str in our response
    this.headerData.next(result);
  }

  setDemographicsData(demographicsData) {
    this.demographicsData.next(demographicsData);
  }

  setSelectedRecord(selectedCaseRecord) {
    this.setDemographicsData(null);
    this.setCustomHeaderData([]);
    this.selectedCaseRecord$.next(selectedCaseRecord);
  }

  updateCaseRecord(registrySchemaTag: string, keyValue: any, caseId: number, contentId?: number) : Observable<any>{

    let params = new HttpParams().set("caseId", caseId);

    if(contentId){
      params = new HttpParams().set("caseId", caseId).set("contentId", contentId);
    }

    return this.http.put(this.baseApiUrl + 'case-record/' + registrySchemaTag, keyValue, {params}).pipe(
      map(() => {
        this.getByCaseId(registrySchemaTag, caseId).subscribe();
        }
      ),
    );
  }

  searchCases(registrySchemaTag: string, searchTerms?: string[], fieldsList? : string[]):  Observable<CaseRecordApiResponse> {
    let options = {};
    if(searchTerms?.length>0 ||fieldsList?.length> 0){
      const terms: string = searchTerms.join(', ');
      const fields: string = fieldsList?.length ? fieldsList.join(', '): '';
      const httpParams = new HttpParams()
        .set('terms', terms)
        .set('fields', fields)
      options = { params: httpParams };
    }

    return this.http.get(this.baseApiUrl + 'search-cases/' + registrySchemaTag, options).pipe(
      map((result: any) => {
        let caseList: CaseRecord[] = result.cases.map(
          (element: any) => {
            let parsedCase: CaseRecord = {
              caseId: element.caseId,
              givenName: element.firstName,
              lastName: element.lastName,
              gender: element.gender,
              dob: element.dob,
              phone: element.phone,
              state: element.state,
              status: element.status,
              street: element.street,
              city: element.city,
              zip: element.zip,
              initialReportDate: element.initialReportDate
            };
            return parsedCase;
        });
        let parsedResponse: CaseRecordApiResponse = {
          count: result.count,
          data: caseList
        }
        return parsedResponse;
        }
      ),
    );
  };

  getByCaseId (registrySchema, caseId):  Observable<any> {
    let options = {};
    if(!!caseId){
      const httpParams = new HttpParams().set('caseId', caseId);
      options = { params: httpParams };
    }
    return this.http.get(this.baseApiUrl + 'case-record/' + registrySchema,  options).pipe(
      map((result: any) => {
        const mappedCaseRecords = this.createCaseRecordChronologicalData(result);
        if(this.selectedCaseRecord$?.value?.contentId && mappedCaseRecords.length > 0){
          const updatedSelectedRecord = mappedCaseRecords.find(
            record => record.contentId === this.selectedCaseRecord$?.value?.contentId
          );
          this.setSelectedRecord(updatedSelectedRecord);
        }
        this.caseRecordChronologicalData$.next(mappedCaseRecords);
        this.caseRecordChronologicalDataStored$.next(mappedCaseRecords);
        this.sections$.next(this.extractSectionList(result));
        this.demoModeService.setSignificantDateList(mappedCaseRecords);
        return result;
        }
      ),
    );
  };

  getQuestions (section: string, registrySchemaTag: string): Observable<Question[]> {

    const httpParams = new HttpParams().set('section', section);
    const options = { params: httpParams };

    return this.http.get(this.baseApiUrl + 'questions/' + registrySchemaTag,  options).pipe(
      map((result: any) => {
          return result;
        }
      ),
    );
  };


  /**
   * Helper functions start here
   */


  private createCaseRecordChronologicalData(result: any): ChronologicalCaseRecord []{
    const mapped = result.contents.map((element: any)=> {
      //TODO maybe we should implement a constructor and encapsulate this code
        let caseRecordChronologicalData = new ChronologicalCaseRecord();
        caseRecordChronologicalData.contentId = element.contentId;
        caseRecordChronologicalData.section = element.section;
        caseRecordChronologicalData.category = element.category
      //TODO we need to remove the code for parsing the date when the API responds with a
        caseRecordChronologicalData.date = Date.parse(element.date).toString();
        caseRecordChronologicalData.value = element.details?.[0]?.tableDisplayText;
        //caseRecordChronologicalData.value = element.details[0]?.tableDisplayText || element?.derivedValue?.value;
        caseRecordChronologicalData.question = element.question;
        caseRecordChronologicalData.flag = element.flag;
        caseRecordChronologicalData.details = element.details?.[0] || {};
        caseRecordChronologicalData.details.query = element.derivedValue?.value;
        caseRecordChronologicalData.annotation = this.getAnnotation(element);
        return caseRecordChronologicalData;
      }
    );
    return mapped;
  }

  private extractSectionList(result: any): string[]{
    let sections: string[] = [];
    result.contents.forEach((element: any)=> {
      if(sections.indexOf(element.section) === -1){
        sections.push(element.section);
      }
    });
    return sections;
  }

  private getAnnotation(element: any) {
    let annotationList : Annotation[] = [];
    if(!element.annotation?.length || !Array.isArray(element.annotation)){
      return annotationList;
    }
    else {
      annotationList = element.annotation.map((element) => {
        return {
          // TODO make sure the properties sent from the API match the key values we are using here.
          // We also want to sort the annotations (assuming by date).
          annotationId: element.annotationId,
          date: element?.date,
          text: element.text,
          expanded: true,
          updatedBy: 'John Doe'
        }
      })
      annotationList = annotationList?.sort((a, b) => (a.date < b.date) ? 1 : -1);
      return annotationList;
    }

  }

  private filterLatestDateData(latestDate: Date, caseRecordChronologicalData: ChronologicalCaseRecord[]) {
     const currentRecords = caseRecordChronologicalData.filter(caseRecord => {
       return parseInt(caseRecord.date) <= latestDate.getTime();
     });
    this.caseRecordChronologicalData$.next(currentRecords);
  }
}
