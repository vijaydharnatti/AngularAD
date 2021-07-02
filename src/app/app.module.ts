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

//export function MSALInstanceFactory(): IPublicClientApplication {
//  return new PublicClientApplication({
//    auth: {
//      clientId: '7745ea87-715d-4555-b231-acd4d20e7b98',
//      authority: 'https://login.microsoftonline.com/8b24551d-7c2c-4beb-8b61-95f32d9929ef',
//      redirectUri: 'http://localhost:4200'
//    },
//    cache: {
//      cacheLocation: 'sessionStorage',
//      storeAuthStateInCookie: isIE,

//    },
 
//  })
//}

//export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//  const protectedResourceMap = new Map<string, Array<string>>();
//  protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", ['user-read']);

//  return {
//    interactionType: InteractionType.Redirect,
//    protectedResourceMap
//  };

//}

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
        clientId: '7745ea87-715d-4555-b231-acd4d20e7b98',
        authority: 'https://login.microsoftonline.com/8b24551d-7c2c-4beb-8b61-95f32d9929ef',
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: 'localStorage',
      }
    }), {
      interactionType: InteractionType.Popup,
      authRequest: {
        scopes: ['user.read', 'api://7745ea87-715d-4555-b231-acd4d20e7b98',
        'openid',
        'profile',]
      }
    }, {
      interactionType: InteractionType.Popup,

      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read', "mail.send"]],
        ['http://localhost:25561/EmployeeDetail', ['api://7745ea87-715d-4555-b231-acd4d20e7b98']]

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
export class AppModule { }
