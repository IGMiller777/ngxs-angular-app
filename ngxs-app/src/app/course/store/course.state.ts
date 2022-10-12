import {Course} from "../model/course.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {CourseService} from "../service/course.service";
import {Router} from "@angular/router";
import { AddCourse, UpdateCourse, GetCourses, DeleteCourse } from './course.actions';
import {tap} from "rxjs";

export class CourseStateModel {
  courses!: Course[];
  areCoursesLoaded!: boolean;
}

@State<CourseStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    areCoursesLoaded: false
  }
})

export class CourseState {
  constructor(private courseService: CourseService, private router: Router) {
  }

  @Selector()
  static areCoursesLoaded(state: CourseStateModel) {
    return state.areCoursesLoaded
  }

  @Action(GetCourses)
  getCourses({getState, setState}: StateContext<CourseStateModel>) {
      return this.courseService.getAllCourses().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            courses: result,
            areCoursesLoaded: true
          })
        })
      )
  }

  @Action(DeleteCourse)
  deleteCources({getState, setState}: StateContext<CourseStateModel>, {id} : DeleteCourse) {
    return this.courseService.deleteCourse(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.courses.filter(item => item.id !== id)
        setState({
          ...state,
          courses: filteredArray
        })
      })
    )
  }

  @Action(UpdateCourse)
  updateCourses({getState, setState}: StateContext<CourseStateModel>, {payload, id}: UpdateCourse){
    return this.courseService.updateCourse(id, payload).pipe(
      tap(result => {
        const state = getState();
        const coursesList = [...state.courses];
        const courseIndex = coursesList.findIndex(item => item.id === id);
        coursesList[courseIndex] = result;

        setState({
          ...state,
          courses: coursesList,
        });
      })
    )
  }

  @Action(AddCourse)
  addTodo({getState, patchState}: StateContext<CourseStateModel>, {payload}: AddCourse) {
    return this.courseService.createCourse(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        courses: [...state.courses, result]
      });
      this.router.navigateByUrl('/courses');
    }));
  }

}

