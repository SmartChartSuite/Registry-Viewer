import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {DemoModeService} from "../../../service/demo-mode.service";

@Component({
  selector: 'app-demographic-data',
  templateUrl: './demographic-data.component.html',
  styleUrls: ['./demographic-data.component.scss'],
  standalone: false
})
export class DemographicDataComponent implements OnInit {
  width: string = "8em";
  isDemoModeActive = false;
  @Input() demographicsData;

  constructor(
    private route: ActivatedRoute,
    private responsive: BreakpointObserver,
    private demoModeService: DemoModeService
  ) { }

  ngOnInit(): void {
    this.demoModeService.isDemoModeActive$.subscribe({
      next: value => this.isDemoModeActive = value
    })
  }

}
