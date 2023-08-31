import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DrawerService} from "../../../../service/drawer.service";
import {MatDialog} from "@angular/material/dialog";
import {filter, Subscription} from "rxjs";
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ChronologicalCaseRecord} from "../../../../domani/chronological.case.record";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";
import {DemoModeService} from "../../../../service/demo-mode.service";
import {openAnnotationDialog} from "../../add-record-dialog/add-record-dialog.component";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css', '../../registry-viewer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SectionComponent implements OnInit, OnDestroy {

  @Input() matCardContentHeight: number;
  @Input() section: string;

  panelOpenState = false;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private drawerService: DrawerService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private demoModeService: DemoModeService
  ) { }

  data: ChronologicalCaseRecord[];
  columnsToDisplay = ['category'];
  expandedRow: any | null;
  dataSource: MatTableDataSource<ChronologicalCaseRecord>;
  innerTableDisplayColumns = ['date', 'question', 'annotation'];
  selectedRow: any;
  selectedRowSubscription$: Subscription;
  caseRecordSubscription$: Subscription;
  latestDate: Date = null;

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

    this.caseRecordSubscription$ = this.caseRecordsService.caseRecordChronologicalData$.subscribe({
        next: value => {
          this.data = value;
          this.dataSource = new MatTableDataSource(this.data);
          this.data = value?.filter(element => element.section === this.section);
          this.data = this.data?.sort((a, b) => (a.date < b.date) ? 1 : -1);
          const categories = this.extractCategories(this.data, 'category');

          // create groups and sort them alphabetically by category
          const categorised = this.groupByCategories(categories, this.data)
            .sort(function(a, b) {
              const textA = a.category.toUpperCase();
              const textB = b.category.toUpperCase();
              return (textA < textB) ? -1 : (textA < textB) ? 1 : 0;
            });
          if(this.latestDate && categorised){
            this.dataSource.data = this.filterBasedOnLatestDate(this.latestDate, categorised);
          }
          else {
            this.dataSource.data = categorised;
          }
        }
      });

    this.demoModeService.latestDate$.subscribe({
      next: latestDate => {
        if(latestDate && this.data?.length > 1){
          this.latestDate = latestDate;
          this.dataSource.data = this.filterBasedOnLatestDate(this.latestDate, this.dataSource.data);
        }
      }
    });

    this.selectedRowSubscription$ = this.caseRecordsService.selectedCaseRecord$.subscribe({
      next: value => this.selectedRow = value
    });

  }

  onRowClick(row: any) {
    this.selectedRow = row;
    this.drawerService.open();
    this.caseRecordsService.setSelectedRecord(row);
  }

  onAddRecord(): void {
    this.caseRecordsService.selectedCaseRecord$.next(null);
    this.drawerService.close();
    openAnnotationDialog(this.dialog, {section: this.section, description: "Sample annotation text", caseId: this.route.snapshot.params['id']})
      .pipe(filter(val => !!val))
      .subscribe(
        val=> console.log(val)
      )
  }

  ngOnDestroy(): void {
    this.selectedRowSubscription$.unsubscribe();
    this.caseRecordSubscription$.unsubscribe();
  }

  getSectionName(section: string): string {
    if(section === "Diagnoses"){
      return "Diagnosis"
    }
    else {
      return section;
    }
  }

  getAddButtonName(section: string): string {
    if(section === "Diagnoses"){
      return " Add Diagnosis"
    }
    else if (section === "Other Medical History") {
      return "Add Record";
    }
    else {
      return "Add " + section;
    }
  }

  private filterBasedOnLatestDate(latestDate: Date, data) {
    // console.log(data[0].data = data[0].data.filter(element => element.date <= latestDate));
    // const filtered = data.map(record => {
    //   const innerList = record?.data?.filter(value => {
    //     console.log(value.date);
    //     console.log(latestDate);
    //     return value.date <= latestDate.getTime();
    //   })
    //   return innerList
    // });
   //console.log(filtered);

    return data;
  }
}
