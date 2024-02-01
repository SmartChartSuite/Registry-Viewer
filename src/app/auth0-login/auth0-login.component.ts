import { Component } from '@angular/core';
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../assets/config/auth-code-flow-config";
import {from, Observable, skipWhile, switchMap, tap} from "rxjs";
import {MetadataService} from "../service/metadata.service";

@Component({
  selector: 'app-auth0-login',
  templateUrl: './auth0-login.component.html',
  styleUrls: ['./auth0-login.component.scss']
})

export class Auth0LoginComponent {

  constructor(public oauthService: OAuthService, private metadataService: MetadataService) {
    this.configure();
  }

  private configure() {
    // Load information from Auth0 (could also be configured manually)
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    const userLoggedIn: Observable<boolean> = from(this.oauthService.loadDiscoveryDocumentAndTryLogin());
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(value=> {
      console.log(this.oauthService.getIdToken());
      console.log(this.oauthService.getAccessToken());
      console.log(value)
    })
    //this.oauthService.initCodeFlow();

    userLoggedIn.pipe(
        skipWhile(value => !value),
        switchMap(() => this.metadataService.getMetadata()),
        tap(registrySchemaList => this.metadataService.setSelectedRegistrySchema(registrySchemaList[0])),
      ).subscribe({
          next: registry => {
            console.info(registry);
          },
          error: err => console.error(err)
        }
      )

  }

}
