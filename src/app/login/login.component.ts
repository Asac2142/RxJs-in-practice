import { AuthStoreService } from './../services/auth.store.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthStoreService) { }

  ngOnInit() {
    this.initForm();
  }

  login() {
    const val = this.form.value;

    this.authService.login(val.email, val.password)
      .subscribe(
        () => this.router.navigateByUrl('/courses'),
        (error) => alert('Login failed')
      );
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }
}
