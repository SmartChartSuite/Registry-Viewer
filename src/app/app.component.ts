import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DemoModeService} from "./service/demo-mode.service";
import {RegistrySchema} from "./domain/registry.schema";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SMART-PACER-Registry-Viewer';

  isDemoModeActive: boolean = false;

  isChronologicalViewActive = true;
  registrySchema: RegistrySchema;

  constructor(
    private demoModeService: DemoModeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.demoModeService.isDemoModeActive$.subscribe({
      next: value => this.isDemoModeActive = value
    });
    this.route.queryParams.subscribe(params=> this.registrySchema = params as RegistrySchema);
  }

  onRouteChanged(route: string) {
    this.router.navigate([route]);
    this.demoModeService.setDemoModeActive(false);
  }

  onToggleDemoMode() {
    this.isDemoModeActive = !this.isDemoModeActive;
    this.demoModeService.setDemoModeActive(this.isDemoModeActive);
    if(!this.isDemoModeActive){
      this.demoModeService.setLatestDate(null);
    }
  }

  isDemoModeEnabled() {
    return this.router.url.indexOf('case') != -1;
  }

}
