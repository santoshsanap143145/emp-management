import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { EmployeeDashboardComponent } from './shared/components/employee-dashboard/employee-dashboard.component';
import { EmployeeFormComponent } from './shared/components/employee-form/employee-form.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeDashboardComponent,
    EmployeeFormComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
