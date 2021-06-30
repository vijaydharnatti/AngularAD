import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptedHttpService implements HttpInterceptor {
  token: any;

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setAuthorizationHeader(req));
  }

  private setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {

    this.token = window.localStorage.getItem('Token');
    if (this.token) {

      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      });

      return authReq;
    }

    return req;

  }

  // Response Interceptor



}





