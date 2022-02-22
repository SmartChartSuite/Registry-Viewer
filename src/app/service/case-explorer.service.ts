import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable} from "rxjs";
import {CaseRecordApiResponse} from "../model/case.record.api.response";

@Injectable({
  providedIn: 'root'
})
export class CaseExplorerService {

  constructor(private http: HttpClient) { }

  getCases(
    filter?: string,
    sortOrder?: string,
    sortBy?: string,
    pageNumber?: number,
    pageSize?: number):  Observable<CaseRecordApiResponse> {

    const filterParam: string = filter || '';
    const sortOrderParam: string = sortOrder || 'asc';
    const sortByParam: string = sortBy || 'personId';
    const pageNumberParam: number = pageNumber || 0;
    const pageSizePram: number = pageSize || 10;

    return this.http.get('/api/person-list', {
      params: new HttpParams()
        .set('filter', filterParam)
        .set('sortBy', sortByParam)
        .set('sortOrder', sortOrderParam)
        .set('pageNumber', pageNumberParam)
        .set('pageSize', pageSizePram)
    }).pipe(map((result: any) =>
        result as CaseRecordApiResponse
      ),
    );
  }
}