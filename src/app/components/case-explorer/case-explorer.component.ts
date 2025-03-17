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
import {SearchApiOptionsEnum} from "../../domain/search-api-options";
import {SearchTypeEnum} from "../../domain/search-type";
import {Search} from "../../domain/search";

export interface SearchHistory{
  index: number;
  queryStr: string;
  searchResults: QuerySearchApiResponse;
}

@Component({
  selector: 'app-case-explorer',
  templateUrl: './case-explorer.component.html',
  styleUrls: ['./case-explorer.component.scss'],
  standalone: false,
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CaseExplorerComponent implements OnInit {

  isLoading = false;
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
  LOADING_RECORDS_MSG = "Loading Search Results";

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

  onSearchEvent(search: Search) {
    if(search.searchType == SearchTypeEnum.PATIENT_SEARCH){
      this.executePatientSearch(search.queryStr, search.apiOption)
    }
    else if(search.searchType == SearchTypeEnum.population){
      this.executePopulationSearch(search.queryStr, this.selectedRegistrySchema)
    }
  }

  private executePatientSearch(queryStr: string, apiOption: SearchApiOptionsEnum) {
    let searchTerms = queryStr?.trim().split(/\s+/);
    if (apiOption == SearchApiOptionsEnum.TRADITIONAL) {
      this.getCaseRecords(this.selectedRegistrySchema.tag, searchTerms);
    }
    else if(apiOption == SearchApiOptionsEnum.LLM){
      this.getLlmCaseRecords(queryStr);
    }
  }

  private executePopulationSearch(queryStr: string, selectedRegistrySchema: RegistrySchema) {
    this.isLoading = true;
    this.llmSearchService.getLLMResponse(queryStr, selectedRegistrySchema, SearchTypeEnum.population).subscribe({
      next: response=> {
        this.populationSearchResults = response
        this.saveSearchHistory(response, queryStr);
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
      }
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

  onApiOptionsChangeEvent(apiOption: SearchApiOptionsEnum) {
    this.executePatientSearch('', apiOption);
  }

  private getLlmCaseRecords(searchFormValue: any) {
    //TODO implement llm search
    console.log(searchFormValue);
    this.patientSearchResults = {data: [], count: 0};
  }
}
