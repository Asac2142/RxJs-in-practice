import { catchError, map, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '../messages/messages.service';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  loadCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map((response: any) => response['payload']),
      catchError((error: any) => {
        this.messageService.showErrors('Could not load courses');
        return throwError(error);
      })
    );
  }

  save(courseId: number, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError((error) => {
        this.messageService.showErrors('Could not save course');
        return throwError(error);
      }),
      shareReplay()
    );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', this.getSearchParams(search)).pipe(
      map((response) => response['payload']),
      shareReplay()
    );
  }

  private getSearchParams(search: string): any {
    return {
      params: {
        filter: search,
        pageSize: '100',
      },
    };
  }
}
