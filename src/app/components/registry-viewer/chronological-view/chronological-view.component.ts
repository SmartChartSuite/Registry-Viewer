import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatMultiSort, MatMultiSortTableDataSource, TableData} from "ngx-mat-multi-sort";
import {CaseRecordsService} from "../../../service/case-records.service";
import {FormControl} from "@angular/forms";
import {ChronologicalCaseRecord} from "../../../model/chronological.case.record";
import {SidenavService} from "../../../service/sidenav.service";
import {Subscription} from "rxjs";
import {MultiSortTableService} from "../../../service/multi-sort-table.service";


@Component({
  selector: 'app-chronological-view',
  templateUrl: './chronological-view.component.html',
  styleUrls: ['./chronological-view.component.css']
})
export class ChronologicalViewComponent implements OnInit, OnDestroy{

  /**
   * The multi-sort table is not supported by google and is a 3rd party widget.
   * The code for the multi-sort table is here: https://github.com/Maxl94/ngx-multi-sort-table
   * This is the example provided by the developers how to use the code:
   * https://stackblitz.com/edit/angular-vf7brq?file=src%2Fapp%2Ftable-sorting-example.html
   * While I am skeptical about the reliability of the implementation, the users requested the feature and
   * our team implemented it. The implementation could easily be reverted to using the Angular material table.
   */

  @ViewChild(MatMultiSort) sort: MatMultiSort;
  caseRecordsSubscription$: Subscription;
  table: TableData<any>;
  selectedSectionFormControl = new FormControl();
  selectedSections: any;
  selectedRow: ChronologicalCaseRecord;
  caseRecordChronologicalData: ChronologicalCaseRecord[];
  filterList = [];
  sections$: Subscription;
  sections: string[];

  constructor(
    private caseRecordsService: CaseRecordsService,
    private sidenavService: SidenavService,
    private multiSortTableService: MultiSortTableService
  ) {

    // this.table = new TableData<any>([
    //   { id: "date", name: "date" },
    //   { id: "question", name: "question" },
    //   { id: "value", name: "value" },
    //   { id: "section", name: "section" },
    //   { id: "category", name: "category" },
    //   { id: "annotation", name: "annotation" },
    // ], { defaultSortParams: ['date'], defaultSortDirs: ['desc'] });
    this.table = new TableData<any>([
      { id: "contentId", name: "contentId" },
      { id: "date", name: "date" },
      { id: "question", name: "question" },
      { id: "value", name: "value" },
      { id: "section", name: "section" },
      { id: "category", name: "category" },
      { id: "annotation", name: "annotation" },
    ], { defaultSortParams: ['date'], defaultSortDirs: ['desc'] });
  }

  initTableObservables(): void {
    this.table.nextObservable.subscribe(() => {
      this.getData(this.filterList);
    });
    this.table.sortObservable.subscribe(() => {
      this.getData(this.filterList);
    });
    this.table.previousObservable.subscribe(() => {
      this.getData(this.filterList);
    });
    this.table.sizeObservable.subscribe(() => {
      this.getData(this.filterList);
    });
    setTimeout(() => {
      this.initData();
    }, 0);
  }

  ngOnInit() {
    this.sections$ = this.caseRecordsService.sections$.subscribe(
      value => {
        this.sections = value;
        this.selectedSectionFormControl.patchValue(this.sections);
        this.selectedSections = this.sections?.map((element) => ({name: element, selected: true}));
      });
    this.initTableObservables();
  }

  initData() {
    this.table.dataSource = new MatMultiSortTableDataSource(
      this.sort,
    );
    this.table.pageSize = 50;
    this.getData(this.filterList);
  }

  onSectionSelectionChange() {
    this.filterList = this.selectedSections.filter(element => element.selected).map(element => element.name);
    if(this.filterList.length === 0){
      // when no filters are selected the data source filter does not run, and we need to empty the table manually
      this.table.data = [];
      this.table.totalElements = 0;
    }
    else {
      this.getData(this.filterList);
    }
  }

  setTableData(data){
    this.table.data = data;
  }

  getData(filterList: string[]) {
    this.caseRecordsSubscription$ = this.caseRecordsService.caseRecordChronologicalData$.subscribe({
      next: value => {
        let data = value;
        if(filterList?.length > 0) {
          // the multi-sort table does not inherit the filters for the mat table, but filtering our data is quite trivial.
          data = value.filter((caseRecord)=> filterList.indexOf(caseRecord.section) != -1);
        }
        if(data && data.length) {
          this.caseRecordChronologicalData = data;
          const res = this.multiSortTableService.list(
            this.table.sortParams,
            this.table.sortDirs,
            this.table.pageIndex,
            this.table.pageSize,
            data
          );
          this.table.totalElements = res.totalElements;
          this.table.pageIndex = res.page;
          this.table.pageSize = res.pagesize;
          this.table.data = res.tableData;
      }
    }});
  }

  onSelectRow(row) {
    this.sidenavService.open();
    this.selectedRow = row;
    this.caseRecordsService.setSelectedRecord(row);
  }

  ngOnDestroy(): void {
    this.caseRecordsSubscription$.unsubscribe();
    this.sections$.unsubscribe();
  }
}
