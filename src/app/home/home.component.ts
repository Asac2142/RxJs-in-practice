import { CourseService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses(): void {
    const courses$ = this.courseService
      .loadCourses()
      .pipe(map((courses) => courses.sort(sortCoursesBySeqNo)));

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) => this.filterByCategory(courses, 'beginner'))
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) => this.filterByCategory(courses, 'advanced'))
    );
  }

  private filterByCategory(courses: Course[], category: string): Course[] {
    return courses.filter(
      (course) => course.category.toLowerCase() === category.toLowerCase()
    );
  }
}
