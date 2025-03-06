import { Injectable } from '@angular/core';
import {forkJoin, map, Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentHandlerService} from "./environment-handler.service";
import {LlmResponse} from "../domain/llm-response";
import {QuerySearchApiResponse} from "../domain/case.record.api.response";

@Injectable({
  providedIn: 'root'
})
export class LlmSearchService {
  llmSearchUrl = '';

  constructor(private http: HttpClient, private environmentHandler: EnvironmentHandlerService) {
    //replace with LLM search url
    this.llmSearchUrl = `${this.environmentHandler.getBaseApiURL()}llm-query`;
  }

  getLLMResponse(query: string, selectedRegistrySchema): Observable<QuerySearchApiResponse>{
    // const getOmopQuery = this.http.get(`${this.llmSearchUrl}get_omop_query`);
    // const getInterpretOmopResults = this.http.get(`${this.llmSearchUrl}interpret_omop_results`);
    console.log(query);
    console.log(selectedRegistrySchema.tag);
    let params = new HttpParams()
      .set('query',query)
    return this.http.get(`${this.llmSearchUrl}/${selectedRegistrySchema.tag}`, {params: params}).pipe(tap(response=>console.log(response)))
    // const getOmopQuery = this.http.get('assets/data/interpretOmopResults.json');
    // const getInterpretOmopResults = this.http.get('assets/data/omopQuery.json');
    // return forkJoin([getOmopQuery, getInterpretOmopResults]).pipe(map(response => new LlmResponse(response)));
  }
}
