import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DemoModeService} from "./service/demo-mode.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SMART-PACER-Registry-Viewer';

  isDemoModeActive: boolean = false;

  isChronologicalViewActive = true;

  constructor(
    private demoModeService: DemoModeService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.demoModeService.isDemoModeActive$.subscribe({
      next: value => this.isDemoModeActive = value
    });
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
    return this.router.url.indexOf('registry-viewer') != -1;
  }

}
