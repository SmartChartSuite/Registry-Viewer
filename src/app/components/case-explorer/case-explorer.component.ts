import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordsService} from "../../service/case-records.service";
import {CaseRecord} from "../../domain/case.record";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CaseRecordApiResponse} from "../../domain/case.record.api.response";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../provider/format-datepicker";
import {UtilsService} from "../../service/utils.service";
//import {AuthService} from "@auth0/auth0-angular";
import {combineLatest, from, mergeMap, Observable, of, skipWhile, switchMap, tap} from "rxjs";
import {RegistrySchema} from "../../domain/registry.schema";
import {OAuthService} from "angular-oauth2-oidc";

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource : MatTableDataSource<CaseRecord>;
  displayedColumns: string[] = ['lastName', 'givenName', 'dob', 'gender', 'address', 'phone', 'initialReportDate', 'lastUpdated', 'status'];
  isLoading = true;
  searchForm: FormGroup;
  registrySchema: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseRecordsService: CaseRecordsService,
    private formBuilder: FormBuilder,
    private utilService: UtilsService,
    public oauthService: OAuthService,
 //   public auth: AuthService
  ) { }

  getCaseRecords(registrySchema: string, searchTerms?: string[]): void {
    console.log(this.oauthService.getIdToken());
    // this.isLoading = true;
    // let search$ = this.caseRecordsService.searchCases(registrySchema, searchTerms);
    // let authenticatedSearch$ = combineLatest(
    //   [this.auth.user$, search$]).pipe(
    //     skipWhile(combinedResults => combinedResults.some(result => result === undefined)),
    //     mergeMap(combinedResults => {
    //       return of(combinedResults[1]);
    //     })
    // )
    // authenticatedSearch$.subscribe({
    //   next: (response: CaseRecordApiResponse) => {
    //     this.dataSource = new MatTableDataSource(response.data);
    //     this.isLoading = false;
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error: err => {
    //     console.error(err);
    //     this.isLoading = false;
    //     this.utilService.showErrorMessage( `${err.status} Server Error loading records.`);
    //   }
    // })


    const userLoggedIn: Observable<boolean> = from(this.oauthService.loadDiscoveryDocumentAndTryLogin());

    userLoggedIn.pipe(
      skipWhile(value => {
        console.log(value);
        return !value
      }),
      switchMap(() => this.caseRecordsService.searchCases(registrySchema, searchTerms)),
    ).subscribe({
      next: (response: CaseRecordApiResponse) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
        this.utilService.showErrorMessage( `${err.status} Server Error loading records.`);
      }
    });


    // this.isLoading = true;
    // let search$ = this.caseRecordsService.searchCases(registrySchema, searchTerms);
    // const userLoggedIn: Observable<boolean> = from(this.oauthService.loadDiscoveryDocumentAndTryLogin());
    // let authenticatedSearch$ = combineLatest(
    //   [userLoggedIn, search$]).pipe(
    //     skipWhile(combinedResults => combinedResults.some(result => result === undefined)),
    //     mergeMap(combinedResults => {
    //       return of(combinedResults[1]);
    //     })
    // )
    // authenticatedSearch$.subscribe({
    //   next: (response: CaseRecordApiResponse) => {
    //     this.dataSource = new MatTableDataSource(response.data);
    //     this.isLoading = false;
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error: err => {
    //     console.error(err);
    //     this.isLoading = false;
    //     this.utilService.showErrorMessage( `${err.status} Server Error loading records.`);
    //   }
    // })

  }

  ngOnInit(): void {
    this.registrySchema = this.route.snapshot.queryParams['registrySchema'];
    if(!this.registrySchema){
        this.router.navigate(["/"]);
        return;
    }
    this.getCaseRecords(this.registrySchema);
    this.searchForm = this.formBuilder.group({
      searchQuery: [null],
      dob: [null]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row: any) {
    this.router.navigate(['case', row.caseId], { queryParams: {registrySchema: this.registrySchema}} );
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
      this.getCaseRecords(this.registrySchema, searchTerms);
    }
  }
}
