import { UpdateStudentRequest } from './../models/api-models/update-student-request.model';
// import { Student } from 'src/app/models/ui-models/student.model';
import { Student } from './../models/api-models/student.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = "https://localhost:44365";

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + "/students");
  }

  getStudent(studentId: string){
    return this.httpClient.get<Student>(this.baseApiUrl + "/students/" + studentId);
  }

  updateStudent(studentId: string, studentRequest: Student)
  {
      const updateStudent: UpdateStudentRequest =
      {
        firstName : studentRequest.firstName,
        lastName : studentRequest.lastName,
        dateOjBirth : studentRequest.dateOjBirth,
        email : studentRequest.email,
        mobile : studentRequest.mobile,
        genderId : studentRequest.genderId,
        postalAddress : studentRequest.address.postalAddress,
        physicalAddress : studentRequest.address.physicalAddress
      }

      return this.httpClient.put<Student>(this.baseApiUrl + "/students/" + studentId, updateStudent);
  }

  deleteStudent(studentId: string)
  {
    return this.httpClient.delete(this.baseApiUrl + '/students/' + studentId);
  }
}
