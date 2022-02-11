import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {distinctUntilChanged, fromEvent, Subscription, tap} from "rxjs";
import { debounceTime } from "rxjs/operators";
import {CaseExplorerService} from "../../service/case-explorer.service";
import {CaseRecord} from "../../model/case.record";
interface ngOnDestroy {
}

class CaseRecordService {
}

@Component({
  selector: 'app-case-explorer',
  templateUrl: './case-explorer.component.html',
  styleUrls: ['./case-explorer.component.css']
})
export class CaseExplorerComponent implements OnInit, AfterViewInit, ngOnDestroy {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['personId', 'firstName', 'lastName', 'gender', 'age'];
  totalCount: 0;
  caseRecordList: CaseRecord[];
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  filterResultsObservable$: Subscription;
  loadDataObservable$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private caseExplorerService: CaseExplorerService,
  ) { }

  getCaseRecords(filter: string, sortOrder: string, sortBy: string, pageNumber: number, pageSize: number): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseExplorerService.getCases(filter, sortOrder, sortBy, pageNumber, pageSize).subscribe(
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
    console.log(row);
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
}
