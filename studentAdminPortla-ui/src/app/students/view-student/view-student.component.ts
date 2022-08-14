import { GendersService } from './../../services/genders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { StudentService } from '../student.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId:string | null | undefined;
  student:Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOjBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id:'',
      description:''
    },
    address: {
      id:'',
      physicalAddress:'',
      postalAddress:'',
    },
  };

  genderList: Gender[] = [];

  constructor(private studentService:StudentService,
              private gendersService: GendersService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{   // get parametrs from route
      this.studentId = params.get('id');
      if(this.studentId){
        this.studentService.getStudent(this.studentId).subscribe((response) =>{
          this.student = response
          console.log(response);
        }, (error) =>{
          console.log(error);
        })

        this.gendersService.getGendersList().subscribe((response)=>{
          console.log(response);
          this.genderList = response;
        }, (error) =>{
          console.log(error);
        })
      }
    })
  }

  onUpdate()
  {
    this.studentService.updateStudent(this.student.id, this.student).subscribe((response) =>{
      // show notification
      this.snackBar.open("The student is updated successfully!", undefined, {
        duration: 2000
      });
      console.log(response);
    }, (error) =>{
      this.snackBar.open("Something went wrong when updating the student");
      //Log error
      console.log(error);
    });
  }

  onDelete()
  {
    this.studentService.deleteStudent(this.student.id).subscribe((response) =>{
      console.log(response);
      this.snackBar.open("Student(" + this.student.firstName +") was successfully deleted!", undefined, {
        duration: 2000
      })

      setTimeout(() => {
        this.router.navigateByUrl('/students');
      }, 2000);
    }, (error) => {
      console.log(error);
      this.snackBar.open("Something went wrong when deleting the student");
    });
  }

}
