import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpEvent, HttpBackend } from '@angular/common/http';

import { TokenStorageService } from '../service/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenStorageService,
    private httpBackend: HttpBackend
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const skipInterceptor = req.headers.has('Anonymous');
    let authReq = req;
    const token = this.token.getToken();
    let newHeaders;
    if (skipInterceptor === false) {
      if (token != null) {
        authReq = req.clone({ headers: req.headers.set('sessionkey', token) });
      }
      return next.handle(authReq);
    } else {
      newHeaders = req.headers.delete('sessionkey');
      newHeaders = req.headers.delete('Anonymous');
      authReq = req.clone({ headers: newHeaders });
      return next.handle(authReq);
    }
  }
}

export const AuthInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];