import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordsService} from "../../service/case-records.service";
import {CaseRecord} from "../../model/case.record";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {CaseRecordApiResponse} from "../../model/case.record.api.response";

@Component({
  selector: 'app-case-explorer',
  templateUrl: './case-explorer.component.html',
  styleUrls: ['./case-explorer.component.css'],
})
export class CaseExplorerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource : MatTableDataSource<CaseRecord>;
  displayedColumns: string[] = ['lastName', 'givenName', 'dob', 'gender', 'address', 'phone', 'initialReportDate', 'status'];
  isLoading = true;
  searchForm: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseRecordsService: CaseRecordsService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  getCaseRecords(searchTerms?: string[]): void {
    this.isLoading = true;
    this.caseRecordsService.searchCases(searchTerms).subscribe(
      (response: CaseRecordApiResponse) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnInit(): void {
    this.getCaseRecords();
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
    this.router.navigate(['registry-viewer', row.caseId]);
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
      };
      const dobStr = this.getDateStr(dob);
      searchTerms.push(dobStr);
    }

    if(searchTerms){
      this.getCaseRecords(searchTerms);
    }
  }
}
