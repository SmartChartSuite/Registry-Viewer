import {AuthConfig} from "angular-oauth2-oidc";
import config from "../config/config.json";

export const authCodeFlowConfig: AuthConfig = {
  issuer: `https://${config.auth.domain}/`,
  redirectUri: config.auth.callbackUrl,
  clientId: config.auth.clientId,
  responseType: config.auth.responseType,
  scope: config.auth.scope,
  showDebugInformation: config.auth.showDebugInformation,
  logoutUrl: config.auth.logoutUrl,
  customQueryParams: config.auth.customQueryParams
}
