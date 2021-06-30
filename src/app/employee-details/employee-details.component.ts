import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee-service';
import { EmployeeDetails } from './employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  formData: EmployeeDetails = new EmployeeDetails();
  value: any;

  constructor(public service: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  public EmployeeDetails(values: any) {
    var _me = this;
    this.service.EmployeeDetails(values).subscribe(
      res => {
        this.router.navigate(['/list']);
      },
      err => {
        console.log(err);
      }

    );
  }

  public List() {
    this.router.navigate(['/list']);

  }
}
