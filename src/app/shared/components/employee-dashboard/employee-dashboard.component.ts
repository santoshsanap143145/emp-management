import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../../services/employee.service';
import { Iemployee } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  employArr: Array<Iemployee> = [];
  displayedColumns: Array<string> = [
    'no',
    'firstName',
    'lastName',
    'email',
    'contact',
    'gender',
    'company',
    'education',
    'experience',
    'dob',
    'actions',
  ];
  dataSource = new MatTableDataSource<Iemployee>([]);

  @ViewChild(MatSort) sort!: MatSort;
  rowForms: { [id: string]: FormGroup } = {};
  constructor(
    private _matDialog: MatDialog,
    private _employeeService: EmployeeService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  openForm() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '50%';
    const dialogRef = this._matDialog.open(EmployeeFormComponent, matConfig);
    dialogRef.afterClosed().subscribe((empObj) => {
    if (empObj) {
      // Push the new employee object into the dataSource
      this.employArr = [empObj, ...this.employArr]
      this.dataSource.data = this.employArr;
    }
  });
  }

  getEmployees() {
    this._employeeService.fetchAllEmployess().subscribe({
      next: (res) => {
        console.log(res);
        this.employArr = Object.keys(res).map((key) => {
          const emp = { ...res[key], id: key, isEditMode: false };
          this.rowForms[key] = this._fb.group({
            firstName: [emp.firstName],
            lastName: [emp.lastName],
            email: [emp.email],
            contact: [emp.contact],
            gender: [emp.gender],
            dob: [emp.dob],
            education: [emp.education],
            company: [emp.company],
            experience: [emp.exp],
          });
          return emp;
        });

        console.log(this.employArr);

        this.dataSource.data = this.employArr.reverse();
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onEdit(row: Iemployee) {
    row.isEditMode = true;
  }

  onSave(row: Iemployee) {
    const updatedData = this.rowForms[row.id].value;

    const newData: Iemployee = {
      ...updatedData,
      id: row.id,
    };

    this._employeeService.updateEmployee(row.id, newData).subscribe({
      next: () => {
        row.isEditMode = false;
        Object.assign(row, newData); // Update UI
      },
      error: (err) => {
        console.error('Error updating employee', err);
      },
    });
  }

  onCancel(row: Iemployee) {
    row.isEditMode = false;
    const form = this.rowForms[row.id];
    if (form) {
      form.patchValue({ ...row }); // Reset values
    }
  }

  onDelete(row: any){

  }

  getControl(rowId: string, controlName: string): FormControl {
  return this.rowForms[rowId].get(controlName) as FormControl;
}
}
