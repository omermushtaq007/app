import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';
import { Vendor } from 'src/app/common/model/data-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
})
export class VendorComponent implements OnInit {
  public vendorForm: FormGroup;
  ServerError: any;
  SuccessMessage: any;
  tableMessage: any;
  vendor!: Vendor[];
  isEdit!: Boolean;
  id: String = '';

  constructor(private fb: FormBuilder, private _vendorService: VendorService) {
    this.vendorForm = this.fb.group({
      slug: ['', Validators.required],
    });
  }

  save() {
    const form = this.vendorForm;
    if (!this.isEdit) {
      const value = this.vendorForm.value;
      this._vendorService.addVendor(value).subscribe(
        (res: any) => {
          setTimeout(() => {
            location.reload();
          }, 1000);

          form.reset();
          const msg = `Enter Successfully "${this.vendorForm.value.slug}".`;
          return (this.SuccessMessage = msg);
        },
        (err) => {
          const response = err.error.errors[0].msg;
          if (response) {
            this.ServerError = response;
            setTimeout(() => {
              this.ServerError = null;
            }, 3000);
          }
        }
      );
    } else {
      this._vendorService.update(this.vendorForm.value, this.id).subscribe(
        (res: any) => {
          if (this.vendorForm.dirty) {
            this.SuccessMessage = `${res.msg} "${form.value.slug}"`;
            form.reset();

            setTimeout(() => {
              location.reload();
              this.SuccessMessage = null;
            }, 2000);
          } else {
            this.ServerError =
              'Please change the value for edit or click cancel.';
            setTimeout(() => {
              this.ServerError = null;
            }, 2000);
          }
        },
        (err) => console.log(err)
      );
    }
  }

  getVendor() {
    return this._vendorService.getAll().subscribe(
      (res: any) => {
        const value = res['allVendor'];
        console.log(value);

        return (this.vendor = value);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteVendor(data: String) {
    this._vendorService.deleteData(data).subscribe(
      (res: any) => {
        const msg = res.msg;
        this.tableMessage = msg;
        setTimeout(() => {
          this.tableMessage = null;
          window.location.reload();
        }, 2000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateVendor(data: String) {
    this._vendorService.getData(data).subscribe((res: any) => {
      this.isEdit = true;
      const value = res['vendor'];
      if (value) {
        this.id = value._id;
        this.vendorForm = this.fb.group({
          slug: [value.slug],
        });
      }
    });
  }
  ngOnInit(): void {
    this.getVendor();
  }
}
