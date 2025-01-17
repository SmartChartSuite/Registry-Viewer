import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CaseRecord} from "../../../domain/case.record";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnChanges{
  @Input() apiResponse;
  @Input() dataFilter;
  @Output() onPatientSelectedEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource : MatTableDataSource<CaseRecord>;
  displayedColumns: string[] = ['lastName', 'givenName', 'dob', 'gender', 'address', 'phone', 'initialReportDate', 'status'];

  onRowClicked(row: any) {
    this.onPatientSelectedEvent.emit(row);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['apiResponse']?.currentValue){
      this.dataSource = new MatTableDataSource(this.apiResponse.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if(changes['dataFilter']?.currentValue){
      const filterValue = this.dataFilter;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
