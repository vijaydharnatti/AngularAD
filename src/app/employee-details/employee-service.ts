import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeDetails } from "./employee.model";
import { AppSettings } from "../Framework/AppSetting";
import { Observable } from "rxjs";
import { tap } from 'rxjs/internal/operators/tap';



@Injectable()
export class EmployeeService {

  ServiceBaseUrl: string = AppSettings.EmpService;
  token: any;

  constructor(public http: HttpClient) {
  }


  public EmployeeDetails(EmpDetails: any): Observable<any> {
    this.token = window.localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
////      "Access- Control - Request - Method": "POST",
////"Access - Control - Request - Headers": "origin",
      'Authorization': "Bearer" + this.token,

    })

    return this.http.post<any>(this.ServiceBaseUrl + "EmployeeDetail/AddEmployee", EmpDetails).pipe(
      tap(res => res)
    );
  }
  public GetEmployeeDetails(): Observable<any> {
    this.token = window.localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer" + this.token,
    })
    return this.http.get<any>(this.ServiceBaseUrl + "EmployeeDetail/Get").pipe(
      tap(res => res)
    );
  }
}
