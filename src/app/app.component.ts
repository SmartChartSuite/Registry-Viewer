import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tr-state-syphilis-registry-ui';
  private router: Router
  onTitleClick() {
    this.router.navigate(['/']);
  }
}
