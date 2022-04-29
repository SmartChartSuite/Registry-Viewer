import {Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {CaseRecordsService} from "../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-demographic-data',
  templateUrl: './demographic-data.component.html',
  styleUrls: ['./demographic-data.component.css']
})
export class DemographicDataComponent implements OnInit {

  cols: number = 3;
  width: string = "8em";
  demographicsData: any;


  constructor(
    private route: ActivatedRoute,
    private responsive: BreakpointObserver,
    private caseRecordService: CaseRecordsService
  ) { }

  ngOnInit(): void {
    const caseId =  this.route.snapshot.params['id'];
    this.caseRecordService.searchCases([caseId.toString()], ['caseId']).subscribe(
      {
      next: value => this.demographicsData = value?.data[0]
      }
    );

    this.responsive.observe([
      Breakpoints.XSmall,
    ])
      .subscribe(result => {
        this.cols = 3;
        this.width = "8em";
        if (result.matches) {
          this.cols = 1;
          this.width = "6em";
        }
      });

  }

}
