import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordsService} from "../../service/case-records.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CaseRecordApiResponse, QuerySearchApiResponse} from "../../domain/case.record.api.response";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../provider/format-datepicker";
import {UtilsService} from "../../service/utils.service";
import {OAuthService} from "angular-oauth2-oidc";
import {MetadataService} from "../../service/metadata.service";
import {RegistrySchema} from "../../domain/registry.schema";
import {LlmSearchService} from "../../service/llm-search.service";

export enum SearchTypeEnum {
  POPULATION_SEARCH = 'Population Query',
  PATIENT_SEARCH = 'Patient Search',
}

export enum SearchApiOptionsEnum {
  TRADITIONAL = 'Standard',
  LLM = 'AI Query'
}


export interface SearchHistory{
  index: number;
  queryStr: string;
  searchResults: QuerySearchApiResponse;
}

@Component({
  selector: 'app-case-explorer',
  templateUrl: './case-explorer.component.html',
  styleUrls: ['./case-explorer.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CaseExplorerComponent implements OnInit {

  isLoading = true;
  searchForm: FormGroup = new FormGroup({});
  selectedRegistrySchema: RegistrySchema;
  response: CaseRecordApiResponse;
  llmSearchForm: FormGroup;
  protected readonly searchType = SearchTypeEnum;
  searchHistory: SearchHistory[];
  filterStr: string;
  readonly SEARCH_HISTORY_LENGTH = 5;
  populationSearchResults: QuerySearchApiResponse;
  patientSearchResults: CaseRecordApiResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseRecordsService: CaseRecordsService,
    private formBuilder: FormBuilder,
    private utilService: UtilsService,
    public oauthService: OAuthService,
    private metadataService: MetadataService,
    private llmSearchService: LlmSearchService
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [null],
    });

    this.llmSearchForm = this.formBuilder.group({
      llmSearchQuery: [null],
    });
  }

  getCaseRecords(registrySchema: string, searchTerms?: string[]): void {
    this.caseRecordsService.searchCases(registrySchema, searchTerms).subscribe({
      next: (response: CaseRecordApiResponse) => {
        this.patientSearchResults = response;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
        this.utilService.showErrorMessage(`${err.status} Server Error loading records.`);
      }
    });
  }

  getPatientSearchResults(){
    this.metadataService.selectedRegistrySchema$.subscribe({
      next: selectedRegistrySchema => {
        if (selectedRegistrySchema) {
          this.selectedRegistrySchema = selectedRegistrySchema;
          this.getCaseRecords(selectedRegistrySchema.tag);
        }
      }
    });
    this.caseRecordsService.setDemographicsData(null);
    this.caseRecordsService.setCustomHeaderData([]);
  }

  ngOnInit(): void {
    //we assume that the we always need to get the data for the Patient Search
    this.getPatientSearchResults();
    this.getCachedQueryData();
    this.searchHistory = this.readSearchHistory();
  }

  onFilterSearchResults(event: string) {
    this.filterStr = event;
  }


  private getCachedQueryData() {

  }

  onSearchEvent(event: any) {
    if(event.apiOptions == SearchApiOptionsEnum.TRADITIONAL){
      this.executePatientSearch(event.searchFormValue)
    }
    else if(event.searchType == SearchTypeEnum.POPULATION_SEARCH){
      this.executePopulationSearch(event.searchFormValue)
    }
  }

  private executePatientSearch(searchFormValue: any) {
    let searchTerms = searchFormValue?.searchQuery?.trim().split(/\s+/);
    if (searchFormValue.apiOptions == SearchApiOptionsEnum.TRADITIONAL) {
      this.getCaseRecords(this.selectedRegistrySchema.tag, searchTerms);
    }
    else if(searchFormValue.apiOptions == SearchApiOptionsEnum.LLM){
      console.log("SearchApiOptionsEnum.LLM");
      this.getLlmCaseRecords(searchFormValue);
    }
  }

  private executePopulationSearch(searchFormValue: any) {
    const searchQuery = searchFormValue?.query;
    this.llmSearchService.getLLMResponse(searchFormValue).subscribe({
      next: response=> {
        this.populationSearchResults = response
        this.saveSearchHistory(response, searchQuery);
      },
      error: err => console.error(err)
    })
  }

  saveSearchHistory(searchResults: QuerySearchApiResponse, queryStr: string) {
    const searchHistoryItem: SearchHistory = {index: 0, queryStr: queryStr, searchResults: searchResults};
    if(this.searchHistory.length < this.SEARCH_HISTORY_LENGTH){
      this.searchHistory = [searchHistoryItem, ...this.searchHistory];
    }
    else {
      this.searchHistory = [searchHistoryItem, ...this.searchHistory.slice(0, this.searchHistory.length - 1)];
    }
    sessionStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
  }

  readSearchHistory(){
    return  JSON.parse(sessionStorage.getItem("searchHistory")) || [];
  }

  onSearchHistorySelected(event: SearchHistory) {
    this.populationSearchResults = event.searchResults;
  }

  onApiOptionsChangeEvent(event: any) {
    this.executePatientSearch(event);
  }

  private getLlmCaseRecords(searchFormValue: any) {
    //TODO implement llm search
    this.patientSearchResults = {data: [], count: 0};
  }
}
