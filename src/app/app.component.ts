import { AuthStoreService } from './services/auth.store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthStoreService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    localStorage.clear();
  }
}
