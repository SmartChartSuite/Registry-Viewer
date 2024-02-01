import {AuthConfig} from "angular-oauth2-oidc";
import config from "../config/config.json";

export const authCodeFlowConfig: AuthConfig = {
  issuer: `https://${config.domain}/`,
  redirectUri: window.location.origin,
  clientId: config.clientId,
  responseType: 'code',
  //scope: "openid email profile",
  scope: 'profile email openid read:scd read:syphilis write:metadata write:scd write:syphilis',
  showDebugInformation: true,
  requireHttps: false,
  logoutUrl: `${config.domain}/v2/logout`,
  customQueryParams: {
    audience: 'http://smartchartsuite.grady/registry-viewer-api/',
  },
};
