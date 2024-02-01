import {AuthConfig, OAuthModuleConfig} from "angular-oauth2-oidc";
import config from "../config/config.json";

export const authCodeFlowConfig: AuthConfig = {
  issuer: `https://${config.domain}/`,
  redirectUri: window.location.origin,
  clientId: config.clientId,
  responseType: 'code',
  scope: 'profile email openid read:scd read:syphilis write:metadata write:scd write:syphilis',
  showDebugInformation: true,
  logoutUrl: `${config.domain}/v2/logout`,
  customQueryParams: { audience: [
      "http://smartchartsuite.grady/registry-viewer-api/"
    ]},
};
export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ["https://smartchartsuite.dev.heat.icl.gtri.org/registry-viewer-api"],
    sendAccessToken: true
  }
}
