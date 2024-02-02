import {Component} from '@angular/core';
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../assets/config/auth-code-flow-config";
import {skipWhile, switchMap, tap} from "rxjs";
import {MetadataService} from "../service/metadata.service";

@Component({
  selector: 'app-auth0-login',
  templateUrl: './auth0-login.component.html',
  styleUrls: ['./auth0-login.component.scss']
})
export class Auth0LoginComponent {
  constructor(public oauthService: OAuthService, private metadataService: MetadataService) {
    this.configureOAuthService();
    this.loadMetadata();
  }

  private configureOAuthService() {
    this.oauthService.events.subscribe(e => console.log(e));
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private loadMetadata() {
    this.oauthService.events.pipe(
      skipWhile(value => !this.oauthService.hasValidAccessToken()),
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
