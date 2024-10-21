import {Component, Input} from '@angular/core';
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {MetadataService} from "../../service/metadata.service";
import {skipWhile, switchMap, tap} from "rxjs";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input({ required: true }) isLocatedInMainMenu: boolean;

  profilePictureUrl: string | null;
  pictureLoadFailed: boolean = false;

  constructor(
    public oauthService: OAuthService,
    public configService: ConfigService,
    private metadataService: MetadataService) {
    this.configure();
    this.loadMetadata();
  }

  private configure() {
    this.oauthService.configure(this.configService.authConfig);
    this.oauthService.customQueryParams = this.configService.config.auth.customQueryParams;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => this.oauthService.getIdentityClaims() ? this.profilePictureUrl = this.oauthService.getIdentityClaims()['picture'] : null);
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
        }
      }
    )
  }
  onImageError(): void {
    this.pictureLoadFailed = true;  // Mark that the image failed to load
  }
}
