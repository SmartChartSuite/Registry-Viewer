import { Component } from '@angular/core';
import {map, Observable, of, skipWhile, tap} from "rxjs";
import {AuthService, User} from "@auth0/auth0-angular";

@Component({
  selector: 'app-auth0-login',
  templateUrl: './auth0-login.component.html',
  styleUrls: ['./auth0-login.component.scss']
})
export class Auth0LoginComponent {
  //user: User;
  constructor(public auth: AuthService,
  ) {
    this.auth.user$.pipe(
      skipWhile(value => !value)
    ).subscribe({
        next: user => {
          console.info(`Logged in as: ${user.email}`)
        }
      }
    )
  }
}
