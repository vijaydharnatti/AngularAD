import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { AuthError } from 'msal';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
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
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)
          
          console.log(res.accessToken);
          this.token = res.accessToken;
          this.msalService.acquireTokenSilent({ scopes: ['api://7745ea87-715d-4555-b231-acd4d20e7b98', 'openid', 'offline_access'] })
            .subscribe(
              res => {
                window.localStorage.setItem('Token', res.accessToken);

                console.log(res.accessToken);
              })


          this.router.navigate(['/details']);

        }
      },
      err => {
        var tokenRequest = {
          scopes: ["user.read", "mail.send", "openid", "profile", "User.Read.All"]
        };
        if (err.name === "InteractionRequiredAuthError") {
           this.msalService.acquireTokenPopup(tokenRequest)
            .subscribe(res => {
              // get access token from response
              // response.accessToken
              console.log(res.idToken);

              console.log(res.accessToken);
            
            })
            
        }
      }
    );

  }
    //this.msalService.handleRedirectCallback()

  public isLoggedIn(): boolean {
    var item = this.msalService.instance.getActiveAccount();
    //if (this.msalService.instance.getActiveAccount()) {
    //  var tokenRequest = {
    //    scopes: ["user.read", "mail.send", "openid", "profile"]
    //  };
    //  this.msalService.acquireTokenSilent(tokenRequest)
    //    .subscribe(res => {
    //      console.log(res.idToken);

    //      console.log(res.accessToken);
    //    })

    //}
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
    //this.msalService.loginPopup().subscribe(
    //  (response: AuthenticationResult) => {
    //    this.msalService.instance.setActiveAccount(response.account)
    //  })
  }

  logout() {

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

  public GetEmployeeDetails(token:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    this.http.get<any>("http://localhost:25561/EmployeeDetail/Get")
      .subscribe(
        res => {
          console.log(res);
        });
    
  }
}
