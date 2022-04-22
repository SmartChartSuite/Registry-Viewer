import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable} from "rxjs";
import {CaseRecordApiResponse} from "../model/case.record.api.response";
import {CaseRecord} from "../model/case.record";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CaseExplorerService {

  constructor(private http: HttpClient) { }

  getCases(searchTerms):  Observable<CaseRecordApiResponse> {
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

  testCall(searchTerm?: string, fields?: string[]):  Observable<Object> {
    let httpParams = new HttpParams();

    searchTerm = 'plamen';

    fields = ['firstName', 'lastName'];

    if(searchTerm){
      httpParams = httpParams.append('searchTerm', searchTerm)
    }
    if(fields){
      httpParams = httpParams.append('fields', fields?.join(', '))
    }

    return this.http.get('/api/search-case', {
      params: httpParams}).pipe(map((result: any) =>
        result as Object
      ),
    );
  }

}
