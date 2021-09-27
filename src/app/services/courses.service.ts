import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  loadCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map((response: any) => response['payload']),
      shareReplay()
    );
  }

  save(courseId: number, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      shareReplay()
    );
  }
}
