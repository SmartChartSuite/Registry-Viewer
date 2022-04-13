import { Component, OnInit, ViewChild} from '@angular/core';
import {MatMultiSort, MatMultiSortTableDataSource, TableData} from "ngx-mat-multi-sort";
import {SidenavService} from "../../../service/sidenav.service";
import {Diagnosis} from "../details-view/diagnostics/diagnostics.component";

export class Record {
  index: number;
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


export class ChronologicalViewComponent implements OnInit {
  CLIENT_SIDE = true;
  selectedRow: Record;
  table: TableData<Record>;
  categoryList: string[] = CATEGORIES;

  @ViewChild(MatMultiSort, { static: false }) sort: MatMultiSort;

  constructor(
    private sidenavService: SidenavService
  ) {
    this.table = new TableData<Record>(
      [
        { id: 'index', name: '#' },
        { id: 'section', name: 'Section' },
        { id: 'category', name: 'Category' },
        { id: 'date', name: 'Date' },
        { id: 'value', name: 'Value' }
      ], { localStorageKey: 'settings' }
    );
  };

  onCategorySelected(){
    console.log("do something");
  }

  ngOnInit() {
    setTimeout(() => {
      this.initData();
    }, 0);
  }

  initData() {
    this.table.dataSource = new MatMultiSortTableDataSource(this.sort, this.CLIENT_SIDE);
    const tableData = DATA.map((element, i) =>
      {let obj: Record = {index: i, category : element.category, date : element.date, section: element.section, value: element.value }; return obj});
    this.table.data = tableData;
  }

  onSelectRow(row) {
    this.sidenavService.open();
    this.selectedRow = row;
    console.log(row);
  }
}

const CATEGORIES = [
  "Lab Results", "Diagnosis", "Treatment", "Other History"
];

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
