import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../core/services/http/student.service';
import { Student } from '../core/models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }

}
