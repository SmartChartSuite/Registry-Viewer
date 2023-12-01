import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {DrawerService} from "../../service/drawer.service";
import {CaseRecordsService} from "../../service/case-records.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DemoModeService} from "../../service/demo-mode.service";
import {UtilsService} from "../../service/utils.service";
import {RegistrySchema} from "../../domain/registry.schema";


@Component({
  selector: 'app-registry-viewer',
  templateUrl: './registry-viewer.component.html',
  styleUrls: ['./registry-viewer.component.scss']
})
export class RegistryViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('resultViewerSidenav') public resultViewerSidenav: MatSidenav;

  breakpoint: number;
  matCardContentHeight: number;
  isDefaultViewActive = true;
  isLoading = false;
  registrySchema: RegistrySchema;

  constructor(private sidenavService: DrawerService,
              private caseRecordsService: CaseRecordsService,
              private route: ActivatedRoute,
              private demoModeService: DemoModeService,
              private utilsService: UtilsService,
              private router: Router) {
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
    this.registrySchema = this.route.snapshot.queryParams as RegistrySchema;
    if(!this.registrySchema?.tag){
      this.router.navigate(["/"]);
      return;
    }
    this.breakpoint = (window.innerWidth<= 992) ? 1 : 2;
    this.setMatCardContentHeight(window.innerWidth);
    this.isLoading = true;
    this.caseRecordsService.getByCaseId(this.registrySchema.tag, this.route.snapshot.paramMap.get('id')).subscribe({
      next: value => this.isLoading = false,
      error: err => {
        this.isLoading = false;
        this.utilsService.showErrorMessage("Server Error when loading data.");
        console.error(err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.resultViewerSidenav);
  }

  onViewSelected(isDefaultView: boolean) {
    this.isDefaultViewActive = isDefaultView;
    this.caseRecordsService.setSelectedRecord(null);
    this.sidenavService.close();
  }
}
