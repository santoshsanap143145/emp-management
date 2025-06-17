import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Iemployee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  empForm!: FormGroup;
  education: Array<string> = [
    'SSC',
    'HSC',
    'Diploma',
    'Graduation',
    'Post Graduation',
  ];
  
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogref: MatDialogRef<EmployeeFormComponent>,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.createEmpForm()
  }

  createEmpForm() {
    this.empForm = this._formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      gender: [null],
      dob: [null, [Validators.required]],
      education: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      company: [null, [Validators.required]],
    })
  }

  onSubmit() {
    if(this.empForm.valid){
      let newEmployee: Iemployee = this.empForm.value
      console.log(newEmployee);
      this._employeeService.addemployee(newEmployee).subscribe({
        next: (res => {
          this._dialogref.close({...newEmployee, id: res.name})
        }),
        error: (err => {
          console.log(err);
        })
      })
    }
  }
}
