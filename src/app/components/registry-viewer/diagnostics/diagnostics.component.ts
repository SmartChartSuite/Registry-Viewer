import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {DiagnosticsService} from "../../../service/diagnostics.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Annotation} from "../annotation-dialog/annotation-dialog.component";
// This is the example we follow https://stackblitz.com/edit/angular-material-table-row-grouping-expand-sort

export class Diagnose {
  name: string = '';
  date: string = '';
  condition: string = '';
  expanded: boolean;
}

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css', '../registry-viewer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiagnosticsComponent implements OnInit {

  @Input() matCardContentHeight: number;


  columnsToDisplay = ['name', 'date'];
  isExpandAllBtnVisible = true;

  dataSource =   [
    {
      "name": "Syphilis",
      "date": "2022-01-04T05:00:00.000Z",
      "condition": "Primary genital syphilis",
      "expanded": false
    },
    {
      "name": "Related Conditions",
      "date": "2015-07-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "Related Conditions",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "Related Conditions",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "Related Conditions",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Gonococcal infection, unspecified",
      "expanded": false
    },
    {
      "name": "HIV",
      "date": "2015-06-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "HIV",
      "date": "2016-12-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": true
    },
    {
      "name": "HIV",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "HIV",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Gonococcal infection, unspecified",
      "expanded": false
    },
    {
      "name": "Other Condition",
      "date": "2015-06-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "Other Condition",
      "date": "2016-12-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "Other Condition",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified",
      "expanded": false
    },
    {
      "name": "Other Condition",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Gonococcal infection, unspecified",
      "expanded": false
    }
  ];


  constructor(
    protected dataSourceService: DiagnosticsService
  ) {}

  ngOnInit(): void {
    // this.dataSourceService.getAllData()
    //   .subscribe({
    //       next(data: any) {
    //         data.data.forEach(element => {
    //           this.data
    //         })
    //         console.log(data);
    //         data.data.forEach(element => element.expanded = true )
    //         this.dataSource = data.data;
    //         console.log(this.dataSource);
    //       },
    //       error(err) {
    //         console.error('something wrong occurred: ' + err);
    //       },
    //     }
    //   );
  };

  expandAll() {
    this.dataSource.forEach((diagnose: Diagnose) => diagnose.expanded = true);
    this.isExpandAllBtnVisible = false;
  }

  collapseAll() {
    this.dataSource.forEach((diagnose: Diagnose) => diagnose.expanded = false);
    this.isExpandAllBtnVisible = true;
  }




}
