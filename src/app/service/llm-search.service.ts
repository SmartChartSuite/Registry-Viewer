import {Injectable, OnDestroy} from '@angular/core';
import {map, Observable, Subject, takeUntil} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentHandlerService} from "./environment-handler.service";
import {QuerySearchApiResponse} from "../domain/case.record.api.response";
import {RegistrySchema} from "../domain/registry.schema";
import {SearchTypeEnum} from "../domain/search-type";

@Injectable({
  providedIn: 'root'
})
export class LlmSearchService implements OnDestroy{
  llmSearchUrl = '';
  private destroy$ = null;

  constructor(private http: HttpClient, private environmentHandler: EnvironmentHandlerService) {
    this.llmSearchUrl = `${this.environmentHandler.getBaseApiURL()}llm-query`;
  }

  cancelSearchRequest(){
    if(this.destroy$){
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  getLLMResponse(query: string, selectedRegistrySchema: RegistrySchema, searchType: SearchTypeEnum): Observable<QuerySearchApiResponse>{
    this.destroy$ = new Subject<void>();
    const type = Object.keys(SearchTypeEnum)[Object.values(SearchTypeEnum).indexOf(searchType)]
    let params = new HttpParams()
      .set('query',query)
      .set('type', type)
    return this.http.get(`${this.llmSearchUrl}/${selectedRegistrySchema.tag}`, {params: params})
      .pipe(
        takeUntil(this.destroy$),
        map(response=>response as QuerySearchApiResponse)
      );
  }

  ngOnDestroy(): void {
    this.cancelSearchRequest();
  }
}
