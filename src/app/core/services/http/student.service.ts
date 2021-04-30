import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {

  endPoint: string = environment.studentEndpoint;


  constructor(private _httpClient: HttpClient) { }

  get(): Observable<Student[]> {
    return this._httpClient.get<Student[]>(this.endPoint);
  }

  getById(id: number): Observable<Student> {
    return this._httpClient.get<Student>(this.endPoint+"/"+id);
  }

  post(student: Student): Observable<Student>{
    return this._httpClient.post<Student>(this.endPoint, student)
  }

  put(student: Student): Observable<Student>{
    return this._httpClient.put<Student>(this.endPoint+"/"+student.id, student)
  }

  delete(student: Student): Observable<Student>{
    return this._httpClient.delete<Student>(this.endPoint+"/"+student.id)
  }

}
