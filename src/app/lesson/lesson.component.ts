import { Lesson } from './../model/lesson';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
})
export class LessonComponent {
  @Input() lessonSelected!: Lesson;
}
