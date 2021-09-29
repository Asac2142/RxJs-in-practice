import { CourseService } from './../services/courses.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css'],
})
export class SearchLessonsComponent {
  searchResult$!: Observable<Lesson[]>;
  selectedLesson!: Lesson;

  constructor(private coursesService: CourseService) {}

  onSearch(input: string): void {
    this.searchResult$ = this.coursesService.searchLessons(input);
  }

  onLessonSelected(lesson: Lesson): void {
    this.selectedLesson = lesson;
  }

  onBackToSearch(): void {
    this.selectedLesson = undefined;
  }
}
