import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CertificationService } from 'src/app/service/certification.service';
import { Certificate, Vendor } from 'src/app/common/model/data-model';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  public certificateForm: FormGroup;
  vendor!: Vendor[];
  certificates!: Certificate[];
  errorMessage!: any;
  successMessage!: any;
  id: String = '';
  isEdit!: Boolean;
  constructor(
    private fb: FormBuilder,
    private _certification: CertificationService,
    private _vendorService: VendorService
  ) {
    this.certificateForm = this.fb.group({
      slug: ['', Validators.required],
      certificateName: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  onSave() {
    const form = this.certificateForm;

    if (!this.isEdit) {
      this._certification.createCertification(form.value).subscribe(
        (res: any) => {
          const msg = `Successfully added a new certification, "${form.value.certificateName}"`;
          this.successMessage = msg;
          setTimeout(() => {
            this.successMessage = null;
            location.reload();
          }, 3000);
          if (!form.dirty) {
            const msg = `Change the value for Update.`;
            this.successMessage = msg;
            setTimeout(() => {
              this.successMessage = null;
            }, 3000);
          }
        },
        (err) => {
          const msg = err.error.errors[0].msg;
          this.errorMessage = msg;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
    } else {
      console.log(form.value);

      this._certification.updateData(form.value, this.id).subscribe(
        (res) => {
          const msg = `Successfully updated a certification, "${form.value.certificateName}"`;
          this.successMessage = msg;
          setTimeout(() => {
            this.successMessage = null;
            location.reload();
          }, 3000);
          if (!form.dirty) {
            const msg = `Change the value for Update.`;
            this.successMessage = msg;
            setTimeout(() => {
              this.successMessage = null;
            }, 3000);
          }
        },
        (err) => {
          const msg = err.error.errors[0].msg;
          this.errorMessage = msg;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
    }
  }

  onUpdate(id: String) {
    this._certification.getData(id).subscribe((res: any) => {
      this.isEdit = true;
      const value = res['certificateData'];
      if (value) {
        this.id = value._id;
        this.certificateForm = this.fb.group({
          slug: [value.slug],
          certificateName: [value.certificateName],
          status: [value.status],
        });
      }
      // console.log(this.certificateForm.value);
    });
  }

  onDelete(id: String) {
    // console.log(id);
    this._certification.deleteData(id).subscribe(
      (res: any) => {
        const msg = res.msg;
        this.successMessage = msg;
        setTimeout(() => {
          this.successMessage = null;
          location.reload();
        }, 3000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this._vendorService.getAll().subscribe((res: any) => {
      const val = res['allVendor'];
      return (this.vendor = val);
    });

    this._certification.getCertification().subscribe((res: any) => {
      const value = res['certification'];
      return (this.certificates = value);
    });
  }
}
