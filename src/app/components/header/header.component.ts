import {Component, OnInit} from '@angular/core';
import packageInfo from "../../../../package.json";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {DemoModeService} from "../../service/demo-mode.service";
import {RegistrySchema} from "../../domain/registry.schema";
import {filter, map} from "rxjs";
import {MetadataService} from "../../service/metadata.service";
import {CaseRecordsService} from "../../service/case-records.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isDemoModeActive: boolean = false;
  registrySchema: RegistrySchema;
  isReturnBtnVisible = false;
  selectedRegistrySchema: RegistrySchema;
  registrySchemaList: RegistrySchema[] = [];
  demographicsData: any
  version = packageInfo.version;
  headerData: any[];

  constructor(
    private router: Router,
    private demoModeService: DemoModeService,
    private metadataService: MetadataService,
    private route: ActivatedRoute,
    public caseRecordsService: CaseRecordsService,
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd))
      .subscribe(event => {
        // check if the url has "case" followed by a digit. If this is the case, we should render the "Return to Registry x" button
        this.isReturnBtnVisible = /case\/\d+/.test(event.url);
      });
  }



  onRegistrySelectionChange() {
    console.log(this.selectedRegistrySchema);
    this.metadataService.setSelectedRegistrySchema(this.selectedRegistrySchema);
  }

  onRouteChanged(route: string) {
    this.router.navigate([route]);
    this.demoModeService.setDemoModeActive(false);
  }

  private initUserAuthenticatedFlow() {
    //this.metadataService.selectedRegistrySchema$.subscribe(value => this.registrySchema = value)

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationStart),
    //   map(event => event as NavigationStart))
    //   .subscribe(event => {
    //     console.log(event)
    //   });
  }

  ngOnInit(): void {

    this.demoModeService.isDemoModeActive$.subscribe({
      next: value => this.isDemoModeActive = value
    });

    this.metadataService.registrySchemaList$.subscribe({
      next: registrySchemaList => {
        if(registrySchemaList?.length){
          this.registrySchemaList = registrySchemaList
          this.selectedRegistrySchema = registrySchemaList[0];
          this.metadataService.setSelectedRegistrySchema(this.selectedRegistrySchema);
        }
      }
    });

    this.caseRecordsService.demographicsData$.subscribe({next: value => this.demographicsData = value});
    this.caseRecordsService.headerData$.subscribe({next: value => this.headerData = value});

  }

  isDemoModeEnabled() {
    const url = this.router.url.substring(1); //remove the '/' from the url;
    const regex = /case\/\d+\?[\w=]+/; // detects "case" followed by a number, followed by "?" followed by anything
    return regex.test(url);
  }

  onToggleDemoMode() {
    this.isDemoModeActive = !this.isDemoModeActive;
    this.demoModeService.setDemoModeActive(this.isDemoModeActive);
    if(!this.isDemoModeActive){
      this.demoModeService.setLatestDate(null);
    }
  }

  onReturnToRegistry() {
    this.router.navigate([''] );
  }

}
