import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from './Student';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'studentManager';
  students: Student[] = [];

  constructor() {  }

  // public getStudents(): void {
  //   this.studentService.getStudents().subscribe(
  //     (response: Student[]) => {
  //       this.students = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  ngOnInit(): void {
    // this.getStudents();
  }

}
