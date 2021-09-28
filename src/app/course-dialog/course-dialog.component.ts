import { LoadingService } from './../loading/loading.service';
import { CourseService } from './../services/courses.service';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  course: Course;

  constructor(
    @Inject(MAT_DIALOG_DATA) course: Course,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseService: CourseService,
    private loading: LoadingService
  ) { this.course = course; }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {}

  save() {
    const courseSaved$ = this.courseService.save(+this.course.id, this.form.value);
    const loadingCourses$ = this.loading.showLoaderUntilCompleted(courseSaved$);

    loadingCourses$.subscribe((value: any) => this.close(value));
  }

  close(value?: any) {
    this.dialogRef.close(value || undefined);
  }

  private initForm(): void {
    this.form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required],
    });
  }
}
