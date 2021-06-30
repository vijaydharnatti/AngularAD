import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeelistComponent } from './employee-details/employee-list.component';

const routes: Routes = [
  { path: 'details', component: EmployeeDetailsComponent },
  { path: 'list', component: EmployeelistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
