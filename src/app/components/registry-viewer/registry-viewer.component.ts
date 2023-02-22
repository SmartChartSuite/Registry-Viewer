import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {DrawerService} from "../../service/drawer.service";
import {CaseRecordsService} from "../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {DemoModeService} from "../../service/demo-mode.service";


@Component({
  selector: 'app-registry-viewer',
  templateUrl: './registry-viewer.component.html',
  styleUrls: ['./registry-viewer.component.css']
})
export class RegistryViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('resultViewerSidenav') public resultViewerSidenav: MatSidenav;

  breakpoint: number;
  matCardContentHeight: number;
  isDefaultViewActive = true;

  constructor(private sidenavService: DrawerService,
              private caseRecordsService: CaseRecordsService,
              private route: ActivatedRoute,
              private demoModeService: DemoModeService) {
  }

  setMatCardContentHeight(windowSize: number){
    if(windowSize <= 1440){
      this.matCardContentHeight = 60;
    }
    else {
      this.matCardContentHeight = 70;
    }
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 992) ? 1 : 2;
    this.setMatCardContentHeight(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth<= 992) ? 1 : 2;
    this.setMatCardContentHeight(window.innerWidth);
    this.caseRecordsService.getByCaseId(this.route.snapshot.paramMap.get('id')).subscribe();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.resultViewerSidenav);
  }

  onViewSelected(isDefaultView: boolean) {
    this.demoModeService.setChronologicalViewActive(!isDefaultView);
    this.isDefaultViewActive = isDefaultView;
    this.caseRecordsService.setSelectedRecord(null);
    this.sidenavService.close();
  }
}
