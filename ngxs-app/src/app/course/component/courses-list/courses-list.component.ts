import {Component, OnDestroy, OnInit} from '@angular/core';
import { GetCourses, DeleteCourse, UpdateCourse } from './../../store/course.actions';
import { CourseState } from './../../store/course.state';
import {Observable, Subscription, tap} from "rxjs";
import {Course} from "../../model/course.model";
import {Select, Store} from "@ngxs/store";


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  @Select(CourseState.getCoursesList) courses$!: Observable<Course[]>
  @Select(CourseState.areCoursesLoaded) areCoursesLoaded$: any;

  courseToBeUpdated!: Course;

  isUpdateActivated = false;
  areCoursesLoadedSub!: Subscription;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.areCoursesLoadedSub = this.areCoursesLoaded$.pipe(
      tap((areCoursesLoaded) => {
        if (!areCoursesLoaded) {
          this.store.dispatch(new GetCourses());
        }
      })
    ).subscribe((value: any) => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.areCoursesLoadedSub.unsubscribe();
  }


  deleteCourse(courseId: string) {
    this.store.dispatch(new DeleteCourse(courseId));
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm: any) {
    this.store.dispatch(new UpdateCourse(updateForm.value, this.courseToBeUpdated.id));
    this.isUpdateActivated = false;
    // this.courseToBeUpdated = null;
  }
}
