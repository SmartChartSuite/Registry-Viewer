import { Injectable } from '@angular/core';
import {Config} from "../models/config";
import {HttpBackend, HttpClient} from "@angular/common/http";
import packageInfo from "../../../package.json";
import {BehaviorSubject, catchError, map, of} from "rxjs";
import {AuthConfig, OAuthModuleConfig} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  defaultConfigPath = 'assets/config/config.json'
  config: Config = new Config();
  authConfig: AuthConfig;
  private oAuthModuleConfig: OAuthModuleConfig;

  private http: HttpClient
  packageInfo = packageInfo;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
    console.info("Config Service Instantiated");
    this.loadConfig();
  }

  loadConfig() {
    let configPath = this.defaultConfigPath;
    return this.http.get<Config>(configPath).pipe(
      map(config => {
        config.version = "v" + this.packageInfo.version;
        this.config = config;
        this.authConfig = this.buildAuthConfig(config);
        this.oAuthModuleConfig = config.auth.moduleConfig;
        return true;
      }),
      catchError(error => {
        console.error(error);
        this.config = new Config();
        return of(false);
      })
    )
  }

  buildAuthConfig(config: Config): AuthConfig {
    return new AuthConfig({
      issuer: config.auth.issuer,
      redirectUri: config.auth.callbackUrl,
      clientId: config.auth.clientId,
      responseType: 'code',
      scope: config.auth.scope,
      showDebugInformation: true,
      requireHttps: false,
      logoutUrl: config.auth.logoutUrl
    });
  }

  getModuleConfig(): OAuthModuleConfig {
    return this.oAuthModuleConfig;
  }
}
