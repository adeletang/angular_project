import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student';
import { StudentService } from 'src/app/core/services/http/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  studentId: number;

  student$: Observable<Student>;

  constructor(private _activateRoute: ActivatedRoute,
    private _studentService: StudentService) { }

  ngOnInit(): void {
    this.studentId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.studentId) {
      this.fetchData(this.studentId);
    }
  }

  fetchData(id: number): void {
    this.student$ = this._studentService.getById(id);
  }


}
