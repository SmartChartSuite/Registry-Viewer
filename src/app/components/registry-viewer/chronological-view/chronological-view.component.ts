import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {SidenavService} from "../../../service/sidenav.service";
import {Diagnosis} from "../details-view/diagnostics/diagnostics.component";
import {MatSidenav} from "@angular/material/sidenav";
import {ChronologicalCaseRecord} from "../../../model/chronological.case.record";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortable} from "@angular/material/sort";

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


export class ChronologicalViewComponent implements AfterViewInit {
  selectedRow: ChronologicalCaseRecord;
  categoryList: string[] = CATEGORIES;
  @Input() caseRecordChronologicalData: ChronologicalCaseRecord[];
  @Input() sections: string[];

  @ViewChild('resultViewerSidenav') public resultViewerSidenav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['contentId', 'date', 'question', 'value', 'section', 'category', 'flag'];
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
    this.sidenavService.setSidenavData(row);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.dataSource = new MatTableDataSource(this.caseRecordChronologicalData);
      this.sort.sort(({ id: 'date', start: 'desc'}) as MatSortable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

}

const CATEGORIES = [
  "Lab Results", "Diagnosis", "Treatment", "Other History"
];
