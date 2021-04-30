import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { NotFoundComponent } from './../shared/components/not-found/not-found.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: "students"
      },
      {
        path: 'students',
        component: StudentListComponent
      },
      {
        path: 'students/:id',
        component: StudentDetailComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
