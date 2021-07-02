import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { AuthError } from 'msal';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

//import * as Msal from 'msal';

declare var Msal: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Employee';
  islogin: boolean = false;
  clientApplication: any;
  token: any;
  
  constructor(private msalService: MsalService, private http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
    if (this.msalService.instance.getAllAccounts().length > 0) {
      this.islogin= true;

    }
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)          
          this.islogin = true;
          this.msalService.acquireTokenSilent({ scopes: [environment.scopes, 'openid', 'offline_access'] })
            .subscribe(
              res => {
                window.localStorage.setItem('Token', res.accessToken);

                console.log(res.accessToken);
              })


          this.router.navigate(['/details']);

        }
      },
    );

  }

  public isLoggedIn(): boolean {
    var item = this.msalService.instance.getActiveAccount();  
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();  
  }

  logout() {
    this.islogin = false;
    window.localStorage.clear();
    this.msalService.logout();

  }

  callprofile() {
    this.http.get("https://graph.microsoft.com/v1.0/me").subscribe(
      res => {
        this.title = JSON.stringify(res);
        console.log(this.title);
      }
    )
  }


}
