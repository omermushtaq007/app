import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../common/model/data-model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  addVendor(vendor: Vendor) {
    const token = localStorage.getItem('token');
    const header = this.auth.header(token);

    return this.http.post(environment.apiBaseUrl + '/vendor', vendor, header);
  }

  getAll() {
    return this.http.get(environment.apiBaseUrl + '/vendor/get-all');
  }

  deleteData(data: any) {
    const token = localStorage.getItem('token');
    const header = this.auth.header(token);

    return this.http.delete(environment.apiBaseUrl + `/vendor/${data}`, header);
  }
  getData(data: any) {
    const token = localStorage.getItem('token');
    const header = this.auth.header(token);

    return this.http.get(environment.apiBaseUrl + `/vendor/${data}`, header);
  }

  update(data: any, id: String) {
  
    const token = localStorage.getItem('token');
    const header = this.auth.header(token);
    return this.http.post(
      environment.apiBaseUrl + `/vendor/${id}`,
      data,
      header
    );
  }
}
