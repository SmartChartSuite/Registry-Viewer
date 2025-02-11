import { Injectable } from '@angular/core';
import {forkJoin, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
    this.llmSearchUrl = this.environmentHandler.getBaseApiURL();
  }

  getLLMResponse(query: string): Observable<QuerySearchApiResponse>{
    // const getOmopQuery = this.http.get(`${this.llmSearchUrl}get_omop_query`);
    // const getInterpretOmopResults = this.http.get(`${this.llmSearchUrl}interpret_omop_results`);

    const getOmopQuery = this.http.get('assets/data/interpretOmopResults.json');
    const getInterpretOmopResults = this.http.get('assets/data/omopQuery.json');
    return forkJoin([getOmopQuery, getInterpretOmopResults]).pipe(map(response => new LlmResponse(response)));
  }
}
