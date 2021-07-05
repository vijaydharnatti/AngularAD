import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { tap } from 'rxjs/internal/operators/tap';


@Injectable()
export class InterceptedHttpService implements HttpInterceptor {
  token: any;

  constructor(private msalService: MsalService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //getting active account and acquiring token
    let accounts = this.msalService.instance.getAllAccounts();
    this.msalService.instance.setActiveAccount(accounts[0]);
    if (this.msalService.instance.getAllAccounts().length > 0) {
      this.msalService.acquireTokenSilent({ scopes: [environment.scopes, 'openid', 'offline_access'] })
        .subscribe(
          res => {
            this.token = res.accessToken;            

          })     
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
        //Response Status
          console.log(event.status);
        }
      })
    );
  }




}





