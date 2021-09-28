import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.beginnerCourses$ = this.store.filterByCategory('beginner');
    this.advancedCourses$ = this.store.filterByCategory('advanced');
  }
}
