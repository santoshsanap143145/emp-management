import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './shared/components/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path: 'empDashboard',
    component: EmployeeDashboardComponent
  },
  {
    path: '',
    redirectTo: 'empDashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
