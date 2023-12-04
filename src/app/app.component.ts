import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DemoModeService} from "./service/demo-mode.service";
import {RegistrySchema} from "./domain/registry.schema";
import {filter, map} from "rxjs";

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
  isReturnBtnVisible = false;

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
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(event => event as NavigationStart),
    ).subscribe(event => this.isReturnBtnVisible = /case\/\d+/.test(event.url));
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

  onReturnToRegistry() {
    this.router.navigate(['case'], { queryParams: this.registrySchema } );
  }
}
