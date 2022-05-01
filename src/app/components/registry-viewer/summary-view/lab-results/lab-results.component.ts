import {Component, Input, OnInit} from '@angular/core';
import {CaseRecordsService} from "../../../../service/case-records.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ChronologicalCaseRecord} from "../../../../model/chronological.case.record";
import {MatTableDataSource} from "@angular/material/table";
import {SidenavService} from "../../../../service/sidenav.service";

@Component({
  selector: 'app-lab-results',
  templateUrl: './lab-results.component.html',
  styleUrls: ['./lab-results.component.css', '../../registry-viewer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LabResultsComponent implements OnInit{

  @Input() matCardContentHeight: number;

  panelOpenState = false;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private sidenavService: SidenavService
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


  groupByCategories(categories: string[], data: ChronologicalCaseRecord[]): any[] {
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
              this.data = value?.filter(element => element.section === 'Lab Results');
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
}
