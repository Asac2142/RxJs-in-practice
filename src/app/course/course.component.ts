import { CourseService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    this.loadCoursesById();
  }

  private loadCoursesById(): void {
    const courseId = +this.route.snapshot.paramMap.get('courseId');
    this.course$ = this.courseService.loadCourseById(courseId);
    this.lessons$ = this.courseService.loadLessonsByCourseId(courseId);
  }
}
