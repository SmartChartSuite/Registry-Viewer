import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatMultiSort, MatMultiSortTableDataSource, TableData} from "ngx-mat-multi-sort";
import {CaseRecordsService} from "../../service/case-records.service";
import {FormControl} from "@angular/forms";
import {ChronologicalCaseRecord} from "../../model/chronological.case.record";
import {SidenavService} from "../../service/sidenav.service";

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number;
  descriptions: string[];
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnChanges, AfterViewInit {
  table: TableData<any>;
  selectedSectionFormControl = new FormControl();
  selectedSections: any;
  selectedRow: ChronologicalCaseRecord;
  caseRecordChronologicalData: ChronologicalCaseRecord[];
  filterList = [];

  @ViewChild(MatMultiSort) sort: MatMultiSort;
  @Input() sections: string[];

  constructor(
    private caseRecordsService: CaseRecordsService,
    private sidenavService: SidenavService
  ) {
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

  ngOnInit() {
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
    this.caseRecordsService.caseRecordChronologicalData$.subscribe({
      next: value => {
        let data = value;
        if(filterList?.length>0){
          data = value.filter((caseRecord)=> filterList.indexOf(caseRecord.section) != -1);
        }
        if(data && data.length){
          this.caseRecordChronologicalData = data;
          const res = this.caseRecordsService.list(
            this.table.sortParams,
            this.table.sortDirs,
            this.table.pageIndex,
            this.table.pageSize,
            data
          );
          this.table.totalElements = res.totalElements;
          this.table.pageIndex = res.page;
          this.table.pageSize = res.pagesize;
          this.table.data = res.users;
      }
    }})
  }

  onSelectRow(row) {
    this.sidenavService.open();
    this.selectedRow = row;
    this.caseRecordsService.setSelectedRecord(row);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['sections'].currentValue){
      this.sections =changes['sections'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedSectionFormControl.patchValue(this.sections);
      this.selectedSections = this.sections?.map((element) => ({name: element, selected: true}));
    })
  }
}
