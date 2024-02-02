import {OAuthModuleConfig} from "angular-oauth2-oidc";
//TODO see if we can extract this to be part of the config.json file
export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ["https://smartchartsuite.dev.heat.icl.gtri.org/registry-viewer-api"],
    sendAccessToken: true
  }
}
