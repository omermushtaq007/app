import { Router } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';
import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/common/model/data-model';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
})
export class VendorComponent implements OnInit {
  vendor!: Vendor[];
  constructor(private _vendorService: VendorService, private _router: Router) {}
  
  GetAll() {
    return this._vendorService.getAll().subscribe((res: any) => {
      const value = res['allVendor'];
      return (this.vendor = value);
    });
  }
  ngOnInit(): void {
    this.GetAll();
  }
}
