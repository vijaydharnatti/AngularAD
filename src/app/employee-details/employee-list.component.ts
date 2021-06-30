import { Component, OnInit } from '@angular/core';
import { EmployeeDetails } from './employee.model';
import { FormsModule, NgForm } from "@angular/forms";
import { EmployeeService } from './employee-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: [
  ]
})
export class EmployeelistComponent implements OnInit {
  //EmpDetails: EmployeeDetails = new EmployeeDetails();
  public EmpDetails: Array<EmployeeDetails>;



  constructor(public service: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.GetEmployeeDetails();
  }

  public GetEmployeeDetails() {
    var _me = this;
    this.service.GetEmployeeDetails().subscribe(
      function (res) {
        _me.EmpDetails = res;
      },
      function (rejection) {
        console.log(rejection);
      });


  }
  
  public CreatePage() {
    this.router.navigate(['/details']);

  }


}
