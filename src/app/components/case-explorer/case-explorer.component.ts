import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordsService} from "../../service/case-records.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CaseRecordApiResponse} from "../../domain/case.record.api.response";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../provider/format-datepicker";
import {UtilsService} from "../../service/utils.service";
import {OAuthService} from "angular-oauth2-oidc";
import {MetadataService} from "../../service/metadata.service";
import {RegistrySchema} from "../../domain/registry.schema";

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
        this.response = response;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
        this.utilService.showErrorMessage(`${err.status} Server Error loading records.`);
      }
    });
  }

  ngOnInit(): void {
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

  applyFilter(event: Event) {
    this.dataFilter = (event.target as HTMLInputElement).value;
  }

  patientSelected(row: any) {
    this.router.navigate(['case', row.caseId], { queryParams: {registrySchema: this.selectedRegistrySchema.tag}} );
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
}
