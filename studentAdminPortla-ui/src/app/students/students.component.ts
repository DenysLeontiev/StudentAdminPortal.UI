import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Student } from './../models/ui-models/student.model';
import { StudentService } from './student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile','gender', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  // @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString:string = '';

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(response => {
      this.students = response;
      this.dataSource = new MatTableDataSource<Student>(this.students);

      if(this.matPaginator){
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort){
        this.dataSource.sort = this.matSort;
      }
    }, error =>{
      console.log(error);
    });
  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
