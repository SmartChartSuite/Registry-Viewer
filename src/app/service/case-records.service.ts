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
  sections$: BehaviorSubject<string[]>


  constructor(private http: HttpClient) {
    this.caseRecordChronologicalData$ = new BehaviorSubject(this.caseRecordChronologicalData);
    this.sections$ = new BehaviorSubject(this.sections);
  }

  updateCaseRecord(caseId: number, contentId: number, keyValue: any) : Observable<any>{

    const obj = {
      "flag": "flag1"
    }
    const params = new HttpParams()
      .set("case-id", caseId)
      .set("content-id", contentId);

    return this.http.put(environment.apiUrl + 'case-record', obj, {params}).pipe(
      map((result: any) => {
        this.getByCaseId(caseId)
        }
      ),
    );
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
}
