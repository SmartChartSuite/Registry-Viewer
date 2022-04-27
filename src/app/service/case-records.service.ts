import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {CaseRecordApiResponse} from "../model/case.record.api.response";
import {CaseRecord} from "../model/case.record";
import {environment} from "../../environments/environment";
import {ChronologicalCaseRecord} from "../model/chronological.case.record";

@Injectable({
  providedIn: 'root'
})
export class CaseRecordsService {

  caseRecordChronologicalData:  ChronologicalCaseRecord [];
  caseRecordChronologicalData$: BehaviorSubject<ChronologicalCaseRecord []>;

  sections: string[];
  sections$: BehaviorSubject<string[]>


  constructor(private http: HttpClient) {
    this.caseRecordChronologicalData$ = new BehaviorSubject(this.caseRecordChronologicalData);
    this.sections$ = new BehaviorSubject(this.sections);
  }

  getAllCases(searchTerms):  Observable<CaseRecordApiResponse> {
    let options = {};
    if(searchTerms && searchTerms.length>0){
      const terms: string = searchTerms.join(', ');
      const httpParams = new HttpParams().set('terms', terms);
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
              specimenCollectionDate: null
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
      const httpParams = new HttpParams().set('case-id', caseId);
      options = { params: httpParams };
    }
    return this.http.get(environment.apiUrl + 'case-record',  options).pipe(
      map((result: any) => {
        this.caseRecordChronologicalData$.next(this.createCaseRecordChronologicalData(result));
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
        caseRecordChronologicalData.value = element?.derivedValue?.value;
        caseRecordChronologicalData.question = element.question;
        caseRecordChronologicalData.flag = element.flag;
        caseRecordChronologicalData.details = element.details[0]?.value;
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
    console.log(sections);
    return sections;
  }
}