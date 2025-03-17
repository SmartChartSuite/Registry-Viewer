import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentHandlerService} from "./environment-handler.service";
import {QuerySearchApiResponse} from "../domain/case.record.api.response";
import {RegistrySchema} from "../domain/registry.schema";
import {SearchTypeEnum} from "../domain/search-type";

@Injectable({
  providedIn: 'root'
})
export class LlmSearchService {
  llmSearchUrl = '';

  constructor(private http: HttpClient, private environmentHandler: EnvironmentHandlerService) {
    //replace with LLM search url
    this.llmSearchUrl = `${this.environmentHandler.getBaseApiURL()}llm-query`;
  }

  getLLMResponse(query: string, selectedRegistrySchema: RegistrySchema, searchType: SearchTypeEnum): Observable<QuerySearchApiResponse>{
    const type = Object.keys(SearchTypeEnum)[Object.values(SearchTypeEnum).indexOf(searchType)]
    let params = new HttpParams()
      .set('query',query)
      .set('type', type)
    return this.http.get(`${this.llmSearchUrl}/${selectedRegistrySchema.tag}`, {params: params})
      .pipe(map(response=>response as QuerySearchApiResponse));
  }
}
