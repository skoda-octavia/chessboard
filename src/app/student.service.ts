// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Student } from './Student';

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentService {
//     private apiServerUrl = 'http://localhost:8080';

//     constructor(private http: HttpClient) { }

//     public getStudents(): Observable<Student[]> {
//         return this.http.get<Student[]>(`${this.apiServerUrl}/api/v1/student`);
//     }
    
//     public addStudents(student: Student): Observable<Student> {
//             return this.http.post<Student>(`${this.apiServerUrl}/api/v1/student`, student);
//             }


//     public updateStudent(student: Student): Observable<Student> {
//             return this.http.put<Student>(`${this.apiServerUrl}/api/v1/student`, student);
//     }
//     public deleteStudent(studentId: number): Observable<void> {
//         return this.http.delete<void>(`${this.apiServerUrl}/api/v1/student/${studentId}`);
//         }
// }
    
