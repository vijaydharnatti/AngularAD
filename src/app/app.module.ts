import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { LocalStorageService, NgxLocalStorageModule } from 'ngx-localstorage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeelistComponent } from './employee-details/employee-list.component';
import { EmployeeService } from './employee-details/employee-service';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    EmployeelistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxLocalStorageModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.clientId,
        authority: environment.authority,
        redirectUri: environment.redirectUri,
        postLogoutRedirectUri: environment.postLogoutRedirectUri
      },
      cache: {
        cacheLocation: environment.cacheLocation,
      }
    }), {
      interactionType: InteractionType.Popup,
      authRequest: {
        scopes: [environment.scopes]
      }
    }, {
      interactionType: InteractionType.Popup,

      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ['https://localhost:44331', [environment.scopes]]

      ])
    }),
    AppRoutingModule,

  ],
  providers: [
    LocalStorageService,
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    //{
    //  provide: MSAL_INTERCEPTOR_CONFIG,
    //  useFactory: MSALInterceptorConfigFactory

    //},
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
