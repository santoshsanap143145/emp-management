import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iemployee, IemployeeRef } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  BASE_URL: string = environment.baseUrl;
  EMP_URL: string = `${this.BASE_URL}/employees`;
  constructor(private _httpClient: HttpClient) {}

  addemployee(data: Iemployee): Observable<any> {
    return this._httpClient.post<any>(`${this.EMP_URL}.json`, data);
  }

  fetchAllEmployess(): Observable<IemployeeRef> {
    return this._httpClient.get<IemployeeRef>(`${this.EMP_URL}.json`);
  }

  updateEmployee(id: string, data: Iemployee): Observable<any> {
    return this._httpClient.patch(`${this.EMP_URL}/${id}.json`, data);
  }

  deleteEmployee(id: string): Observable<any> {
    return this._httpClient.delete(`${this.EMP_URL}/${id}.json`);
  }
}
