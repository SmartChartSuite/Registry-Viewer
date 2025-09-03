import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DemoModeService} from "./service/demo-mode.service";
import {RegistrySchema} from "./domain/registry.schema";
import {filter, map, skipWhile} from "rxjs";
import {MetadataService} from "./service/metadata.service";
import {OAuthService} from "angular-oauth2-oidc";
import  packageInfo from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  isDemoModeActive: boolean = false;
  registrySchema: RegistrySchema;
  isReturnBtnVisible = false;
  isRegistryDescriptionVisible: boolean = false;
  version = packageInfo.version;

  constructor(
    private demoModeService: DemoModeService,
    private router: Router,
    private route: ActivatedRoute,
    private metadataService: MetadataService,
    public oauthService: OAuthService
  ) {
  }

  ngOnInit(): void {

    this.demoModeService.isDemoModeActive$.subscribe({
      next: value => this.isDemoModeActive = value
    });

    this.oauthService.events.pipe(
      skipWhile(value => !this.oauthService.hasValidAccessToken()),
    ).subscribe({
        next: () => this.initUserAuthenticatedFlow(),
        error: err => console.error(err)
      }
    )
  }

  private initUserAuthenticatedFlow() {
    this.metadataService.selectedRegistrySchema$.subscribe(value => this.registrySchema = value);

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(event => event as NavigationStart))
      .subscribe(event => {
        // check if the url has "case" followed by a digit. If this is the case, we should render the "Return to Registry x" button
       // this.isReturnBtnVisible = /case\/\d+/.test(event.url);
        this.isRegistryDescriptionVisible = event.url != '/'; //hide the selected registry when the route is root (this is where a user selects a route)
      });
  }
}
