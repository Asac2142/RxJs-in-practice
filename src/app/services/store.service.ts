import { CourseService } from './courses.service';
import { LoadingService } from './../loading/loading.service';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { MessageService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.storeSubject.asObservable();

  constructor(
    private courseService: CourseService,
    private loading: LoadingService
  ) {
    this.loadAllCourses();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses: Course[]) => courses.filter(
        (course) => course.category.toLowerCase() === category.toLowerCase())
        .sort(sortCoursesBySeqNo)
      )
    );
  }

  saveCourses(courseId: number, changes: Partial<Course>): Observable<any> {
    const courses = this.storeSubject.getValue();
    const index = courses.findIndex((course) => +course.id === courseId);
    const newCourse: Course = {...courses[index], ...changes};
    const newCourses: Course[] = courses.slice();
    newCourses[index] = newCourse;
    this.storeSubject.next(newCourses);

    return this.courseService.save(courseId, changes);
  }

  private loadAllCourses(): void {
    const courses$ = this.courseService.loadCourses();

    this.loading.showLoaderUntilCompleted(courses$).pipe(
      tap((courses) => this.storeSubject.next(courses))
    ).subscribe();
  }
}
