import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SidenavService} from "../../../../service/sidenav.service";
import {MatDialog} from "@angular/material/dialog";
import {openAnnotationDialog} from "../../add-record-dialog/add-record-dialog.component";
import {filter} from "rxjs";
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ChronologicalCaseRecord} from "../../../../model/chronological.case.record";
import {animate, state, style, transition, trigger} from "@angular/animations";

export class Group {
  level = 0;
  expanded = false;
  totalCounts = 0;
}

export class Diagnosis {
  name: string = '';
  date: string = '';
  condition: string = '';
  expanded: boolean;
}

// This is the example we follow https://stackblitz.com/edit/angular-material-table-row-grouping-expand-sort

@Component({
  selector: 'app-diagnoses',
  templateUrl: './diagnoses.component.html',
  styleUrls: ['./diagnoses.component.css', '../../registry-viewer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiagnosesComponent implements OnInit {

  @Input() matCardContentHeight: number;

  panelOpenState = false;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private sidenavService: SidenavService,
    private dialog: MatDialog
  ) { }

  data: ChronologicalCaseRecord[];
  columnsToDisplay = ['category'];
  expandedRow: any | null;
  dataSource: MatTableDataSource<ChronologicalCaseRecord>;
  innerTableDisplayColumns = ['date', 'question'];
  selectedRow: any;

  private extractCategories(data: any, key: string): string[]{
    let result : string[] = [];
    data.forEach((element: any)=> {
      if(result.indexOf(element[key]) === -1){
        result.push(element[key]);
      }
    });
    return result;
  }


  private groupByCategories(categories: string[], data: ChronologicalCaseRecord[]): any[] {
    let groupedData = [];
    categories.forEach(category => {
      let obj : any = {};
      obj.category = category;
      obj.data = []
      this.data.forEach(element => {
        if(element.category === category){
          obj.data.push(element);
        }
      });
      obj.count = obj.data.length;
      obj.expanded = true;
      groupedData.push(obj);
    })
    return groupedData;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);

    this.caseRecordsService.caseRecordChronologicalData$.subscribe({
        next: value => {
          this.data = value;
          if (this.data?.length > 0) {
            this.dataSource = new MatTableDataSource(this.data);
            this.data = value?.filter(element => element.section === 'Diagnoses');
            this.data = this.data?.sort((a, b) => (a.date < b.date) ? 1 : -1);
            const categories = this.extractCategories(this.data, 'category');
            const categorised = this.groupByCategories(categories, this.data);
            this.dataSource.data = categorised;
          }
        }
      }
    )
  }

  onRowClick(row: any) {
    this.selectedRow = row;
    this.sidenavService.open();
    this.caseRecordsService.setSelectedRecord(row);
  }

  onAddDiagnose(): void {
    openAnnotationDialog(this.dialog, {category: "One", description: "Sample annotation text"})
      .pipe(filter(val => !!val))
      .subscribe(
        val=> console.log(val)
      )
  }
}
