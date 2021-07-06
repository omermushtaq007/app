import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  errorForm: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  register() {
    this.auth.register(this.registerForm.value).subscribe(
      (res) => {
        // this.auth.setToken(res['token']);
        if (res) {
          this.router.navigate(['/login']);
        }
      },
      (err: HttpErrorResponse) => {
        let response = err.error.errors[0].msg;
        return this.errorForm = response;
      }
    );
  }
  ngOnInit(): void {}
}
