import { Student } from './../../../core/models/student';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/services/http/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { StudentFormData } from 'src/app/core/models/student-form-data';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students$ : Observable<Student[]>;
  displayedColumns: string[] = ["id", "firstName", "lastName", "class", "update", "delete"];

  constructor(private _studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.loadData();
  }

  loadData(){
    this.students$ = this._studentService.get();
  }

  delete(student: Student){
    this._studentService.delete(student).subscribe(next => {
      this.loadData();
    })
  }

  openDialog(toUpdate: boolean, student: Student){

    const studentFormData: StudentFormData = {
      toUpdate: toUpdate,
      student: student
    };

    const dialogRef = this.dialog.open(StudentFormComponent,{
      data: studentFormData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }

}
