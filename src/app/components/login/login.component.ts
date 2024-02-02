import {Component, Input} from '@angular/core';
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../../assets/config/auth-code-flow-config";
import {MetadataService} from "../../service/metadata.service";
import {skipWhile, switchMap, tap} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    NgIf,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input({ required: true }) isLocatedInMainMenu: boolean;

  constructor(public oauthService: OAuthService, private metadataService: MetadataService) {
    this.configureOAuthService();
    this.loadMetadata();
  }

  private configureOAuthService() {
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
