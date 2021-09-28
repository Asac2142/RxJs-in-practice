import { LoadingService } from './../loading/loading.service';
import { CourseService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from '../messages/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private courseService: CourseService,
    private loading: LoadingService,
    private messagesService: MessageService
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  onCoursesChanged() {
    this.loadCourses();
  }

  private loadCourses(): void {
    const courses$ = this.courseService
      .loadCourses()
      .pipe(
        map((courses) => courses.sort(sortCoursesBySeqNo)),
        catchError((error) => {
          this.messagesService.showErrors('Could not load courses');
          return throwError(error);
        })
      );
    const loadCourses$ = this.loading.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses: Course[]) => this.filterByCategory(courses, 'beginner'))
    );

    this.advancedCourses$ = loadCourses$.pipe(
      map((courses: Course[]) => this.filterByCategory(courses, 'advanced'))
    );
  }

  private filterByCategory(courses: Course[], category: string): Course[] {
    return courses.filter(
      (course) => course.category.toLowerCase() === category.toLowerCase()
    );
  }
}
