import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TableData} from "ngx-mat-multi-sort";
import {SidenavService} from "../../../service/sidenav.service";
import {Diagnosis} from "../details-view/diagnostics/diagnostics.component";
import {MatSidenav} from "@angular/material/sidenav";
import {CaseRecordsService} from "../../../service/case-records.service";
import {ChronologicalCaseRecord} from "../../../model/chronological.case.record";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export class Record {
  section: string;
  category: string;
  date: string;
  value: string;
}

@Component({
  selector: 'app-chronological-view',
  templateUrl: './chronological-view.component.html',
  styleUrls: ['./chronological-view.component.css']
})


export class ChronologicalViewComponent {
  CLIENT_SIDE = true;
  selectedRow: ChronologicalCaseRecord;
  table: TableData<ChronologicalCaseRecord>;
  categoryList: string[] = CATEGORIES;
  @Input() caseRecordChronologicalData: ChronologicalCaseRecord[];

  @ViewChild('resultViewerSidenav') public resultViewerSidenav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['contentId', 'section', 'category', 'date', 'value', 'flag'];
  dataSource: MatTableDataSource<ChronologicalCaseRecord>;

  constructor(
    private sidenavService: SidenavService,
  ) {
  };

  onCategorySelected(){
    console.log("do something");
  }


  onSelectRow(row) {
    this.sidenavService.open();
    this.selectedRow = row;
  }

  ngOnChanges(changes: SimpleChanges) {
    // For now, we want to recreate the table every time we update the data source. In the future this may change :-)
    if(changes['caseRecordChronologicalData']?.currentValue?.length > 0){
      this.dataSource = new MatTableDataSource(changes['caseRecordChronologicalData']?.currentValue);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}

const CATEGORIES = [
  "Lab Results", "Diagnosis", "Treatment", "Other History"
];
