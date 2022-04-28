import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {SidenavService} from "../../../service/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {ChronologicalCaseRecord} from "../../../model/chronological.case.record";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortable} from "@angular/material/sort";
import {FormControl} from "@angular/forms";

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

export class ChronologicalViewComponent implements AfterViewInit, OnChanges {
  selectedRow: ChronologicalCaseRecord;

  @Input() caseRecordChronologicalData: ChronologicalCaseRecord[];
  @Input() sections: string[];

  @ViewChild('resultViewerSidenav') public resultViewerSidenav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['contentId', 'date', 'question', 'value', 'section', 'category', 'annotation'];
  dataSource: MatTableDataSource<ChronologicalCaseRecord>;
  selectedSectionFormControl = new FormControl();
  selectedSections: any;

  constructor(
    private sidenavService: SidenavService,
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.dataSource?.data && changes['caseRecordChronologicalData'].currentValue){
      this.dataSource.data =changes['caseRecordChronologicalData'].currentValue;
    }
    if(changes['sections'].currentValue){
      this.sections =changes['sections'].currentValue;
    }
  }


  onCategorySelected(section: string){
    console.log(section);
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
      this.dataSource.paginator.pageSize = 50;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.getFilterPredicate();
      this.selectedSectionFormControl.patchValue(this.sections);
      this.selectedSections = this.sections?.map((element) => ({name: element, selected: true}));
    })
  }

  private getFilterPredicate() {
    return function (row: any, filters: string) {
      let matchFilter: boolean = false;
      const filterArray = filters.split(',');
      filterArray.forEach((filter: string) => {
          if(row.section.indexOf(filter) != -1){
            matchFilter = true;
          }
        }
      )
      return matchFilter;
    };
  }

  onSectionSelectionChange() {
    const filterList = this.selectedSections.filter(element => element.selected).map(element => element.name);
    if(filterList.length === 0){
      // when no filters are selected the data source filter does not run, and we need to empty the table manually
      this.dataSource.data = [];
    }
    else {
      // else just set back the data source data to what it needs to be (in case emptied at any time before)
      this.dataSource.data = this.caseRecordChronologicalData;
    }
    this.dataSource.filter = filterList.join(',');
  }

}
