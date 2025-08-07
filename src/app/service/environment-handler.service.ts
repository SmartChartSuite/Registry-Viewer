import { Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {Config} from "../models/config";
import localConfig from "../../assets/config/config.json"

@Injectable({
  providedIn: 'root'
})
export class EnvironmentHandlerService {
  config: Config;
  constructor(private configService: ConfigService) {
    this.config = this.configService.config;
  }
  getBaseApiURL(): string {
    let baseApiUrl = this.config.api;
    if (!baseApiUrl.endsWith("/")) {
      baseApiUrl = baseApiUrl.concat("/");
    }
    return baseApiUrl;
  }
  getImpactUrl(): string {
    let impactUrl = this.config.impactUrl;
    if (!impactUrl) {
      impactUrl = localConfig.impactUrl;
    }
    if (!impactUrl.endsWith("/")) {
      impactUrl = impactUrl.concat("/");
    }
    console.log(impactUrl);
    return impactUrl;
  }
}
