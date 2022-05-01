import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {CaseRecordApiResponse} from "../model/case.record.api.response";
import {CaseRecord} from "../model/case.record";
import {environment} from "../../environments/environment";
import {ChronologicalCaseRecord} from "../model/chronological.case.record";
import {Annotation} from "../model/annotation";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordsService {

  caseRecordChronologicalData:  ChronologicalCaseRecord [];
  caseRecordChronologicalData$: BehaviorSubject<ChronologicalCaseRecord []>;

  sections: string[];
  sections$: BehaviorSubject<string[]>;

  selectedCaseRecord: any;
  selectedCaseRecord$: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.caseRecordChronologicalData$ = new BehaviorSubject(this.caseRecordChronologicalData);
    this.sections$ = new BehaviorSubject(this.sections);
    this.selectedCaseRecord$ = new BehaviorSubject(this.sections);
  }

  setSelectedRecord(selectedCaseRecord) {
    this.selectedCaseRecord$.next(selectedCaseRecord);
  }

  updateCaseRecord(caseId: number, contentId: number, keyValue: any) : Observable<any>{

    const params = new HttpParams()
      .set("caseId", caseId)
      .set("contentId", contentId);

    return this.http.put(environment.apiUrl + 'case-record', keyValue, {params}).pipe(
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
      const fields: string = fieldsList.join(', ');
      const httpParams = new HttpParams()
        .set('terms', terms)
        .set('fields', fields)
      options = { params: httpParams };
    }

    return this.http.get(environment.apiUrl + 'search-cases', options).pipe(
      map((result: any) => {
        let caseList: CaseRecord[] = result.cases.map(
          (element: any) => {
            //TODO this parser will not be needed once the API returns correct data
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
    return this.http.get(environment.apiUrl + 'case-record',  options).pipe(
      map((result: any) => {
        const mappedCaseRecords = this.createCaseRecordChronologicalData(result);
        if(this.selectedCaseRecord$?.value?.contentId && mappedCaseRecords.length > 0){
          const updatedSelectedRecord = mappedCaseRecords.find(
            record => record.contentId === this.selectedCaseRecord$?.value?.contentId
          );
          this.setSelectedRecord(updatedSelectedRecord);
        }
        this.caseRecordChronologicalData$.next(mappedCaseRecords);
        this.sections$.next(this.extractSectionList(result))
        return result;
        }
      ),
    );
  };

  private createCaseRecordChronologicalData(result: any): ChronologicalCaseRecord []{
    const mapped = result.contents.map((element: any)=> {
      //TODO maybe we should implement a constructor and encapsulate this code
        let caseRecordChronologicalData = new ChronologicalCaseRecord();
        caseRecordChronologicalData.contentId = element.contentId;
        caseRecordChronologicalData.section = element.section;
        caseRecordChronologicalData.category = element.category
        caseRecordChronologicalData.date = element.date;
        caseRecordChronologicalData.value = element.details[0]?.tableDisplayText;
        //caseRecordChronologicalData.value = element.details[0]?.tableDisplayText || element?.derivedValue?.value;
        caseRecordChronologicalData.question = element.question;
        caseRecordChronologicalData.flag = element.flag;
        caseRecordChronologicalData.details = element.details[0];
        caseRecordChronologicalData.details.query = element.derivedValue.value;
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
      annotationList = element.annotation.map((element, i) => {
        const annotation :Annotation = {
          // TODO make sure the properties sent from the API match the key values we are using here.
          // We also want to sort the annotations (assuming by date).
          position: i,
          updated: element?.updated,
          textValue: element.textValue,
          expanded: true
        }
      })
      return annotationList;
    }

  }


  list(sorting: string[] = [], dirs: string[] = [], page = 0, pagesize = 20, data) {
    const tempUsers = Object.assign([], data);
    const result = {
      users: [],
      page: page,
      pagesize: pagesize,
      totalElements: tempUsers.length
    };

    if (sorting.length === 0) {
      result.users = tempUsers.slice(page * pagesize, (page + 1) * pagesize);
    } else if (sorting.length > 0) {
      const sortedUsers = tempUsers.sort((u1, u2) => {
        return this._sortData(u1, u2, sorting, dirs);
      });
      result.users = sortedUsers.slice(page * pagesize, (page + 1) * pagesize);
    }

    return result;
  }

  _sortData(
    d1: any,
    d2: any,
    sorting: string[],
    dirs: string[]
  ): number {
    if (d1[sorting[0]] > d2[sorting[0]]) {
      return dirs[0] === "asc" ? 1 : -1;
    } else if (d1[sorting[0]] < d2[sorting[0]]) {
      return dirs[0] === "asc" ? -1 : 1;
    } else {
      if (sorting.length > 1) {
        sorting = sorting.slice(1, sorting.length);
        dirs = dirs.slice(1, dirs.length);
        return this._sortData(d1, d2, sorting, dirs);
      } else {
        return 0;
      }
    }
  }

}
