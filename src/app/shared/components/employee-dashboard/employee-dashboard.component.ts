import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../../services/employee.service';
import { Iemployee } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../services/snackbar.service';

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
  filterText: string = '';
  constructor(
    private _matDialog: MatDialog,
    private _employeeService: EmployeeService,
    private _fb: FormBuilder,
    private _snackbar: SnackbarService
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
        this.employArr = [empObj, ...this.employArr];
        this.dataSource.data = this.employArr;
        this._snackbar.openSnackBar(
          `New Employee ${empObj.firstName} ${empObj.lastName} is added Successfully !!`
        );
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
            experience: [emp.experience],
          });
          return emp;
        });

        console.log(this.employArr);

        this.dataSource.data = this.employArr.reverse();
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filterText = filterValue;
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
        Object.assign(row, newData);
        this._snackbar.openSnackBar(
          `The Employee ${newData.firstName} ${newData.lastName} is updated Successfully !!`
        );
      },
      error: (err) => {
        console.error(err);
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

  onDelete(row: Iemployee) {
    const dailogRef = this._matDialog.open(GetConfirmComponent, {
      width: '350px',
      disableClose: true,
      data: {
        message: `Are you sure you want to delete ${row.firstName} ${row.lastName}?`,
      },
    });

    dailogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this._employeeService.deleteEmployee(row.id).subscribe({
          next: (res) => {
            this._snackbar.openSnackBar(
          `The Employee ${row.firstName} ${row.lastName} is removed Successfully !!`
        );
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

  getControl(rowId: string, controlName: string): FormControl {
    return this.rowForms[rowId].get(controlName) as FormControl;
  }
}
