import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {distinctUntilChanged, fromEvent, Subscription, tap} from "rxjs";
import { debounceTime } from "rxjs/operators";
import {CaseExplorerService} from "../../service/case-explorer.service";
import {CaseRecord} from "../../model/case.record";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
interface ngOnDestroy {
}

@Component({
  selector: 'app-case-explorer',
  templateUrl: './case-explorer.component.html',
  styleUrls: ['./case-explorer.component.css'],
})
export class CaseExplorerComponent implements OnInit, AfterViewInit, ngOnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['lastName', 'givenName', 'dob', 'gender', 'address', 'phone', 'specimenCollectionDate', 'status'];
  totalCount: 0;
  caseRecordList: CaseRecord[];
  isLoading = true;
  searchBy = ['lastName', 'givenName'];
  searchTerm = '';

  filterResultsObservable$: Subscription;
  loadDataObservable$: Subscription;
  searchForm: FormGroup;
  private searchTerms : string[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseExplorerService: CaseExplorerService,
    private formBuilder: FormBuilder,
  ) { }

  getCaseRecords(filter: string, sortOrder: string, sortBy: string, pageNumber: number, pageSize: number): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseExplorerService.getCases(this.searchTerms).subscribe(
      (response: any) => {
        this.caseRecordList = response.data;
        this.totalCount = response.count;
        this.dataSource = new MatTableDataSource<any>(this.caseRecordList);
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.getCaseRecords(null, null, null, null, null);
    this.caseExplorerService.getCases(this.searchTerms).subscribe();
    this.searchForm = this.formBuilder.group({
      searchQuery: [null],
      dob: [null]
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe(() => {
      this.getCaseRecords(
        this.input.nativeElement.value,
        this.sort.direction,
        this.sort.active,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    });

    this.filterResultsObservable$ = fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.getCaseRecords(
            this.input.nativeElement.value,
            this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        })
      ).subscribe();
  }

  ngOnDestroy(){
    this.filterResultsObservable$.unsubscribe();
    this.loadDataObservable$.unsubscribe();
  }

  onRowClicked(row: any) {
    this.router.navigate(['registry-viewer']);
  }

  pageChanged(event: PageEvent) {
    this.getCaseRecords(
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  onSearch() {

  }

  onSubmit() {
    console.log(this.searchForm);
  }
}
