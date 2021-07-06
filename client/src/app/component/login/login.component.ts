import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../common/model/user-model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!: User;
  public loginForm: FormGroup;
  // Response Control
  ErrorMessage!: String;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private auth: AuthService // private _: lo
  ) {
    this.loginForm = this.fb.group({
      email: ['umermushtaq3424@gmail.com', Validators.required],
      password: ['Ustaadg000786', Validators.required],
    });

    this.user = this.auth.user;
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      async (res: any) => {
        const token = res['token'];
        if (token) {
          this.auth.setToken(token);
          const hasHeader = this.auth.header(token);
          // await this.reload();
          this.auth.payload(hasHeader).subscribe((res: any) => {
            this.user = res['user'];
            this.router.navigate(['/']);
            localStorage.setItem('refresh', '0');
          });
        }
      },
      (err) => {
        const response = err.error.msg;
        return (this.ErrorMessage = response);
      }
    );
  }

  ngOnInit(): void {}
}
