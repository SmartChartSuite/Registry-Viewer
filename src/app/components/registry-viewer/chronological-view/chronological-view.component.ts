import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-chronological-view',
  templateUrl: './chronological-view.component.html',
  styleUrls: ['./chronological-view.component.css']
})


export class ChronologicalViewComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['date', 'section', 'category', 'value', 'action'];
  dataSource = new MatTableDataSource(DATA);

  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}


const DATA = [
  {
    "section": "Diagnostics",
    "category": "Syphilis",
    "date": "2022-01-04T05:00:00.000Z",
    "value": "Primary genital syphilis"
  },
  {
    "section": "Diagnostics",
    "category": "Related Conditions",
    "date": "2015-07-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Related Conditions",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Related Conditions",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Related Conditions",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Gonococcal infection, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "HIV",
    "date": "2015-06-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "HIV",
    "date": "2016-12-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "HIV",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "HIV",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Gonococcal infection, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Other Condition",
    "date": "2015-06-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Other Condition",
    "date": "2016-12-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Other Condition",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Chlamydial infection of genitourinary tract, unspecified"
  },
  {
    "section": "Diagnostics",
    "category": "Other Condition",
    "date": "2016-08-19T04:00:00.000Z",
    "value": "Gonococcal infection, unspecified"
  },
  {
    "section": "Lab Results",
    "category": "Syphilis",
    "date": "2022-01-14T05:00:00.000Z",
    "value": "Reagin Ab [Presence] in Serum by RPR / Reactive"
  },
  {
    "section": "Lab Results",
    "category": "Syphilis",
    "date": "2022-01-14T05:00:00.000Z",
    "value": "Reagin Ab [Titer] in Serum by RPR / 1:4"
  },
  {
    "section": "Lab Results",
    "category": "Syphilis",
    "date": "2021-07-10T04:00:00.000Z",
    "value": "Reagin Ab [Titer] in Serum by RPR / 1:64"
  },
  {
    "section": "Lab Results",
    "category": "Syphilis",
    "date": "2021-07-10T04:00:00.000Z",
    "value": "Reagin Ab [Presence] in Serum by RPR / Reactive"
  },
  {
    "section": "Lab Results",
    "category": "HIV",
    "date": "2021-07-10T04:00:00.000Z",
    "value": "HIV 1+2 Ab [Presence] in Serum / Negative"
  },
  {
    "section": "Lab Results",
    "category": "HIV",
    "date": "2021-07-10T04:00:00.000Z",
    "value": "HIV 1+2 Ab [Presence] in Serum / Negative"
  },

]
