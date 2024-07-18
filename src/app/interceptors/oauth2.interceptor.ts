import {inject, Injectable} from '@angular/core';
import {OAuthResourceServerErrorHandler, OAuthStorage} from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {ConfigService} from "../service/config.service";
import {Observable} from "rxjs";

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {

  constructor(
    private authStorage: OAuthStorage,
    private errorHandler: OAuthResourceServerErrorHandler,
    private configService: ConfigService
  ) {
  }

  private checkUrl(moduleConfig, url: string): boolean {
    let found = moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
    return !!found;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let moduleConfig = inject(ConfigService).getModuleConfig();
    let url = req.url.toLowerCase();

    if (!moduleConfig) return next.handle(req);
    if (!moduleConfig.resourceServer) return next.handle(req);
    if (!moduleConfig.resourceServer.allowedUrls) return next.handle(req);
    if (!this.checkUrl(moduleConfig, url)) return next.handle(req);

    let sendAccessToken = moduleConfig.resourceServer.sendAccessToken;

    if (sendAccessToken) {

      let token = inject(OAuthStorage).getItem('access_token');
      let header = 'Bearer ' + token;

      let headers = req.headers
        .set('Authorization', header);

      req = req.clone({ headers });
    }

    return next.handle(req);//.catch(err => this.errorHandler.handleError(err));

  }

}
