import { Component } from '@angular/core';
import {skipWhile, switchMap, tap} from "rxjs";
import {AuthService, User} from "@auth0/auth0-angular";
import {MetadataService} from "../service/metadata.service";

@Component({
  selector: 'app-auth0-login',
  templateUrl: './auth0-login.component.html',
  styleUrls: ['./auth0-login.component.scss']
})

export class Auth0LoginComponent {
  constructor(
    public auth: AuthService,
    private metadataService: MetadataService
  ) {
    this.auth.user$.pipe(
      skipWhile(value => !value),
      tap(user => console.info(`Logged in as: ${user.email}`)),
      switchMap(() => this.metadataService.getMetadata()),
      tap(registrySchemaList => this.metadataService.setSelectedRegistrySchema(registrySchemaList[0])),
    ).subscribe({
        next: registry =>
          console.info(registry),
        error: err => console.error(err)
      }
    )
  }
}
