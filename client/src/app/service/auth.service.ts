import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../common/model/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  constructor(private http: HttpClient, private router: Router) {}

  register(user: Observable<User>) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  login(user: Observable<User>) {
    return this.http.post(environment.apiBaseUrl + '/auth', user);
  }

  payload(header: any) {
    return this.http.get(environment.apiBaseUrl + '/auth', header);
  }
  // Help Method.

  header(token: any) {
    let requestOptions: Object = {
      headers: new HttpHeaders().append('x-auth-token', token),
      responseType: 'json',
    };

    return requestOptions;
  }

  setToken(token: any) {
    return localStorage.setItem('token', token);
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
