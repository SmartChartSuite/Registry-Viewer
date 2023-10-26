import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
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

  sections: string[] = [];
  sections$: BehaviorSubject<string[]>;

  baseApiUrl: string;

  selectedCaseRecord: any;
  selectedCaseRecord$: BehaviorSubject<any>;

  constructor(private http: HttpClient, private demoModeService: DemoModeService, private environmentHandler: EnvironmentHandlerService) {
    this.caseRecordChronologicalData$ = new BehaviorSubject(this.caseRecordChronologicalData);
    this.caseRecordChronologicalDataStored$ = new BehaviorSubject(this.caseRecordChronologicalDataStored);
    this.sections$ = new BehaviorSubject(this.sections);
    this.selectedCaseRecord$ = new BehaviorSubject(this.sections);
    this.baseApiUrl = this.environmentHandler.getBaseApiURL();

    this.demoModeService.latestDate$.subscribe({
      next: latestDate => {if(latestDate){this.filterLatestDateData(latestDate, this.caseRecordChronologicalDataStored$.value)}}
    });
  }

  setSelectedRecord(selectedCaseRecord) {
    this.selectedCaseRecord$.next(selectedCaseRecord);
  }

  updateCaseRecord(keyValue: any, caseId: number, contentId?: number) : Observable<any>{

    let params = new HttpParams().set("caseId", caseId);

    if(contentId){
      params = new HttpParams().set("caseId", caseId).set("contentId", contentId);
    }

    return this.http.put(this.baseApiUrl + 'case-record', keyValue, {params}).pipe(
      map((result: any) => {
        this.getByCaseId(caseId).subscribe();
        }
      ),
    );
  }

  searchCases(searchTerms?: string[], fieldsList? : string[]):  Observable<CaseRecordApiResponse> {
    let options = {};
    if(searchTerms?.length>0 ||fieldsList?.length> 0){
      const terms: string = searchTerms.join(', ');
      const fields: string = fieldsList?.length ? fieldsList.join(', '): '';
      const httpParams = new HttpParams()
        .set('terms', terms)
        .set('fields', fields)
      options = { params: httpParams };
    }

    return this.http.get(this.baseApiUrl + 'search-cases', options).pipe(
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

  getByCaseId (caseId):  Observable<any> {
    let options = {};
    if(!!caseId){
      const httpParams = new HttpParams().set('caseId', caseId);
      options = { params: httpParams };
    }
    return this.http.get(this.baseApiUrl + 'case-record',  options).pipe(
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

  getQuestions (section: string): Observable<Question[]> {

    const httpParams = new HttpParams().set('section', section);
    const options = { params: httpParams };

    return this.http.get(this.baseApiUrl + 'questions',  options).pipe(
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
        caseRecordChronologicalData.value = element.details[0]?.tableDisplayText;
        //caseRecordChronologicalData.value = element.details[0]?.tableDisplayText || element?.derivedValue?.value;
        caseRecordChronologicalData.question = element.question;
        caseRecordChronologicalData.flag = element.flag;
        caseRecordChronologicalData.details = element.details[0] || {};
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
