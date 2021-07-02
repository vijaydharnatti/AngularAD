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
      'Authorization': "Bearer " + this.token,

    })

    return this.http.post<any>(this.ServiceBaseUrl + "api/EmployeeDetail", EmpDetails, {headers}).pipe(
      tap(res => res)
    );
  }
  public GetEmployeeDetails(): Observable<any> {
    this.token = window.localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.token,
    })
    return this.http.get<any>(this.ServiceBaseUrl + "api/EmployeeDetail", { headers }).pipe(
      tap(res => res)
    );
  }
}
