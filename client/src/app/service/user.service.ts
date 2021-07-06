import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../common/model/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _authService: AuthService, private http: HttpClient) {}
  getAll() {
    const token = localStorage.getItem('token');
    const header = this._authService.header(token);
    return this.http.get(environment.apiBaseUrl + '/auth/all', header);
  }
}
