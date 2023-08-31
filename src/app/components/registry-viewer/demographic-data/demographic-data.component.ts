import {Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {CaseRecordsService} from "../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {DemoModeService} from "../../../service/demo-mode.service";

@Component({
  selector: 'app-demographic-data',
  templateUrl: './demographic-data.component.html',
  styleUrls: ['./demographic-data.component.scss']
})
export class DemographicDataComponent implements OnInit {

  cols: number = 3;
  width: string = "8em";
  demographicsData: any;
  isDemoModeActive = false;

  constructor(
    private route: ActivatedRoute,
    private responsive: BreakpointObserver,
    private caseRecordService: CaseRecordsService,
    private demoModeService: DemoModeService
  ) { }

  ngOnInit(): void {
    const caseId =  this.route.snapshot.params['id'];
    this.caseRecordService.searchCases([caseId.toString()], ['caseId']).subscribe(
      {
      next: value => this.demographicsData = value?.data[0]
      }
    );

    this.demoModeService.isDemoModeActive$.subscribe({
      next: value => this.isDemoModeActive = value
    })
  }

}
