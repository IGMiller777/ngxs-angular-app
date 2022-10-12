import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseService} from "./service/course.service";
import { CoursesListComponent } from './component/courses-list/courses-list.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';



@NgModule({
  declarations: [
    CoursesListComponent,
    CreateCourseComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    CourseService
  ]

})
export class CourseModule { }
