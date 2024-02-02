import {AuthConfig, OAuthModuleConfig} from "angular-oauth2-oidc";
import config from "../config/config.json";

export const authCodeFlowConfig: AuthConfig = {
  issuer: `https://${config.auth.domain}/`,
  redirectUri: window.location.origin,
  clientId: config.auth.clientId,
  responseType: config.auth.responseType,
  scope: config.auth.scope,
  showDebugInformation: config.auth.showDebugInformation,
  logoutUrl: `${config.auth.domain}/v2/logout`,
  customQueryParams: config.auth.customQueryParams
}
