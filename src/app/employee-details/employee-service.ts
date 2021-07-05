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
   

    return this.http.post<any>(this.ServiceBaseUrl + "api/EmployeeDetail", EmpDetails).pipe(
      tap(res => res)
    );
  }
  public GetEmployeeDetails(): Observable<any> {
   
    return this.http.get<any>(this.ServiceBaseUrl + "api/EmployeeDetail").pipe(
      tap(res => res)
    );
  }
}
