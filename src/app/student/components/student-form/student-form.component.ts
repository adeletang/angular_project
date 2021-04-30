import { StudentService } from 'src/app/core/services/http/student.service';
import { Student } from './../../../core/models/student';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentFormData } from 'src/app/core/models/student-form-data';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;

  formAction: string;

  classes: string[] = [
    'LP-DIM-FI',
    'LP-DIM-APP'
  ]

  constructor(
    private fb: FormBuilder,
    private _studentService: StudentService,
    private _dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFormData
  ) {
    this.formAction = data.toUpdate? "Modifier" : "Ajouter";

    if (data.toUpdate) {
      this.studentForm = this.fb.group({
        firstName: [data.student.firstName, [Validators.required, this.noWhitespaceValidator]],
        lastName: [data.student.lastName, [Validators.required, this.noWhitespaceValidator]],
        birthYear: [data.student.birthYear, [Validators.required]],
        class: [data.student.class, [Validators.required]]
      })
    }
    else {
      this.studentForm = this.fb.group({
        firstName: ['', [Validators.required, this.noWhitespaceValidator]],
        lastName: ['', [Validators.required, this.noWhitespaceValidator]],
        birthYear: ['', [Validators.required]],
        class: ['', [Validators.required]]
      })
    }

  }

  ngOnInit(): void {
  }

  onSubmit(student: Student) {
    if (this.studentForm.valid) {

      if (this.data.toUpdate) {
        student.id = this.data.student.id;
        this._studentService.put(student).subscribe((next) => {
          console.log("YES WE DID IT !!! WE HAVE updated A STUDENT");
          this.studentForm.reset();
          this._dialogRef.close();
        })
      } else {
        this._studentService.post(student).subscribe((next) => {
          console.log("YES WE DID IT !!! WE HAVE ADDED A NEW STUDENT");
          this.studentForm.reset();
          this._dialogRef.close();
        })
      }


    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;

    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
