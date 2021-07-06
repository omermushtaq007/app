import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Certificate } from '../common/model/data-model';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  constructor(private http: HttpClient, private _authService: AuthService) {}
  // get all
  getCertification() {
    return this.http.get(environment.apiBaseUrl + '/certificate');
  }

  createCertification(certificate: Certificate) {
    const token = localStorage.getItem('token');
    const header = this._authService.header(token);
    return this.http.post(
      environment.apiBaseUrl + '/certificate',
      certificate,
      header
    );
  }

  deleteData(id: String) {
    const token = localStorage.getItem('token');
    const header = this._authService.header(token);
    return this.http.delete(
      environment.apiBaseUrl + `/certificate/${id}`,
      header // middleware
    );
  }

  getData(id: String) {
    return this.http.get(environment.apiBaseUrl + `/certificate/${id}`);
  }
  updateData(data: any, id: String) {
    const x = localStorage.getItem('token');
    const header = this._authService.header(x);
    return this.http.post(
      environment.apiBaseUrl + `/certificate/${id}`,
      data,
      header
    );
  }
}
