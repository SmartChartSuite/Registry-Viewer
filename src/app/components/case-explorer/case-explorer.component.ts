import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordsService} from "../../service/case-records.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CaseRecordApiResponse, QuerySearchApiResponse} from "../../domain/case.record.api.response";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../provider/format-datepicker";
import {UtilsService} from "../../service/utils.service";
import {OAuthService} from "angular-oauth2-oidc";
import {MetadataService} from "../../service/metadata.service";
import {RegistrySchema} from "../../domain/registry.schema";``

export enum SearchTypeEnum {
  'QUERY_DATA' = 'QUERY_DATA',
  'PATIENT_SEARCH' = 'PATIENT_SEARCH',
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

  @ViewChild('input') input: ElementRef;
  isLoading = true;
  searchForm: FormGroup = new FormGroup({});
  selectedRegistrySchema: RegistrySchema;
  response: CaseRecordApiResponse;
  dataFilter: any;
  llmSearchForm: FormGroup;
  protected readonly SearchType = SearchTypeEnum;
  searchResults: CaseRecordApiResponse | QuerySearchApiResponse;
  searchHistory: SearchHistory[];
  filterStr: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseRecordsService: CaseRecordsService,
    private formBuilder: FormBuilder,
    private utilService: UtilsService,
    public oauthService: OAuthService,
    private metadataService: MetadataService
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [null],
      dob: [null]
    });

    this.llmSearchForm = this.formBuilder.group({
      llmSearchQuery: [null],
    });
  }

  getCaseRecords(registrySchema: string, searchTerms?: string[]): void {
    this.caseRecordsService.searchCases(registrySchema, searchTerms).subscribe({
      next: (response: CaseRecordApiResponse) => {
        this.searchResults = response;
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
    console.log(this.searchHistory)
  }

  getDateStr(date: Date): string {
    const y  = date.getFullYear().toString();
    const m = (date.getMonth() + 1).toString(); // month is 0 based in js
    const d = date.getDate().toString();
    return y + '-' + m + '-' + d;
  }

  onSearchFormSubmit() {
    //split the string on one or more white spaces
    let searchTerms = this.searchForm.value?.searchQuery?.trim().split(/\s+/);
    const dob = this.searchForm.value?.dob;

    if(dob){
      if(!searchTerms){
        searchTerms = [];
      }
      const dobStr = this.getDateStr(dob);
      searchTerms.push(dobStr);
    }

    if(searchTerms){
      this.getCaseRecords(this.selectedRegistrySchema.tag, searchTerms);
    }
  }


  onFilterSearchResults(event: string) {
    this.filterStr = event;
  }


  private getCachedQueryData() {

  }

  onSearchEvent(event: any) {
    if(event.searchType == SearchTypeEnum.PATIENT_SEARCH){
      this.executePatientSearch(event.searchFormValue)
    }
    else if(event.searchType == SearchTypeEnum.QUERY_DATA){
      this.executeQuerySearch(event.searchFormValue)
    }
  }

  private executePatientSearch(searchFormValue: any) {
    console.log(searchFormValue)
    let searchTerms = searchFormValue?.query?.trim().split(/\s+/);
    const dob = searchFormValue?.dob;

    if(dob){
      if(!searchTerms){
        searchTerms = [];
      }
      const dobStr = this.getDateStr(dob);
      searchTerms.push(dobStr);
    }

    if(searchTerms){
      this.getCaseRecords(this.selectedRegistrySchema.tag, searchTerms);
    }
  }

  private executeQuerySearch(searchFormValue: any) {
    console.log("execute query search here");
    // TODO save search history saveSearchHistory
  }

  saveSearchHistory(searchResults: QuerySearchApiResponse, queryStr: string) {
    const searchHistoryItem: SearchHistory = {index: 0, queryStr: queryStr, searchResults: searchResults};
    if(this.searchHistory.length < 5){
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
}
