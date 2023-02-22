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

  isToggleModeActive: boolean = false;

  isChronologicalViewActive = false;

  constructor(
    private demoModeService: DemoModeService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.demoModeService.isChronologicalViewActive$.subscribe({
      next: value => this.isChronologicalViewActive = value
    })
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
    return this.router.url != '/' && this.isChronologicalViewActive;
  }
}
