import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DemoModeService} from "./service/demo-mode.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMART-PACER-Registry-Viewer';
  isToggleModeActive: boolean = false;
  constructor(
    private demoModeService: DemoModeService,
    private router: Router,
  ) {
  }
  onTitleClick() {
    this.router.navigate(['/']);
  }

  onToggleDemoMode() {
    this.isToggleModeActive = !this.isToggleModeActive;
    this.demoModeService.setDemoModeActive(this.isToggleModeActive);
    if(!this.isToggleModeActive){
      this.demoModeService.setLatestDate(null);
    }
  }

  isDemoModeEnabled() {
    return (this.router.url != '/')
  }
}
