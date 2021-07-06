import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/common/model/user-model';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css'],
  providers: [LoginComponent],
})
export class UserButtonComponent implements OnInit, OnDestroy {
  user!: User;
  constructor(private auth: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  isUser() {
    const token = this.auth.getToken();
    if (token) {
      const header = this.auth.header(token);
      this.auth.payload(header).subscribe(async (res: any) => {
        if (res) {
          return (this.user = res['user']);
        }
      });
    }
  }

  onReload() {}

  logout() {
    this.auth.removeToken();
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }
  ngOnInit(): void {
    this.isUser();
  }
  ngOnDestroy(): void {
    this.isUser();
  }
}
