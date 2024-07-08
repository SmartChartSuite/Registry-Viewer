import {Component, Input} from '@angular/core';
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../../assets/config/auth-code-flow-config";
import {MetadataService} from "../../service/metadata.service";
import {skipWhile, switchMap, tap} from "rxjs";
import {UtilsService} from "../../service/utils.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input({ required: true }) isLocatedInMainMenu: boolean;

  constructor(
    public oauthService: OAuthService,
    public configService: ConfigService,
    private metadataService: MetadataService,
    private utilService: UtilsService) {
    this.configureOAuthService();
    this.loadMetadata();
  }

  private configureOAuthService() {
    this.oauthService.configure(this.configService.authConfig);
    this.oauthService.customQueryParams = this.configService.config["auth"]["customQueryParams"];
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private loadMetadata() {
    this.oauthService.events.pipe(
      skipWhile(value => !this.oauthService.hasValidAccessToken()),
      switchMap(() => this.metadataService.getMetadata()),
      tap(registrySchemaList => this.metadataService.setSelectedRegistrySchema(registrySchemaList[0])),
    ).subscribe({
        next: ()=> {},
        error: err => {
          console.error(err);
          this.utilService.showErrorMessage("Server error loading registry data.");
        }
      }
    )
  }
}
