import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../common/model/data-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient, private _authService: AuthService) {}
  addExam(data: Exam) {
    const token = localStorage.getItem('token');
    const header = this._authService.header(token);
    return this.http.post(environment.apiBaseUrl + '/exams', data, header);
  }
  allExams() {
    return this.http.get(environment.apiBaseUrl + '/exams');
  }
  deleteData(id: String) {
    const token = localStorage.getItem('token');
    const header = this._authService.header(token);
    return this.http.delete(environment.apiBaseUrl + `/exams/${id}`, header);
  }
  getData(id: String) {
    return this.http.get(environment.apiBaseUrl + `/exams/${id}`);
  }
  updateData(data: Exam, id: String) {
    const token = localStorage.getItem('token');
    const header = this._authService.header(token);
    return this.http.post(
      environment.apiBaseUrl + `/exams/${id}`,
      data,
      header
    );
  }
}
