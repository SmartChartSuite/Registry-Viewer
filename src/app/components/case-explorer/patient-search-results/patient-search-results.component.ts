import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CaseRecord} from "../../../domain/case.record";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-patient-search-results',
  templateUrl: './patient-search-results.component.html',
  styleUrl: './patient-search-results.component.scss'
})
export class PatientSearchResultsComponent implements OnChanges{
  @Input() searchResults;
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
    if(changes['searchResults']?.currentValue){
      this.dataSource = new MatTableDataSource(this.searchResults.data);
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
