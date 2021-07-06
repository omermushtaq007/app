import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/service/exam.service';
import { Certificate, Exam, Vendor } from 'src/app/common/model/data-model';
import { VendorService } from 'src/app/service/vendor.service';
import { CertificationService } from 'src/app/service/certification.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  exams!: Exam[];
  vendor!: Vendor[];
  certificates!: Certificate[];

  // response
  errorMessage!: any;
  successMessage!: any;
  isEdit!: Boolean;
  id: String = '';

  public examForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _examService: ExamService,
    private _certification: CertificationService,
    private _vendorService: VendorService
  ) {
    this.examForm = this.fb.group({
      slug: ['', Validators.required],
      examCode: ['', Validators.required],
      examName: ['', Validators.required],
      certificateName: ['', Validators.required],
      question: ['', Validators.required],
      update: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      isRetired: ['', Validators.required],
    });
  }

  onSave() {
    const form = this.examForm;
    // console.log(form.value);

    if (!this.isEdit) {
      this._examService.addExam(form.value).subscribe(
        (res) => {
          this.successMessage = `Successfully Added in Exams "${form.value.examName}"`;
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
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
      this._examService.updateData(form.value, this.id).subscribe(
        (res) => {
          this.successMessage = `Successfully Updated in Exams "${form.value.examName}"`;
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          if (!form.dirty) {
            this.successMessage = `Change the values for update.`;
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
    this._examService.getData(id).subscribe((res: any) => {
      this.isEdit = true;
      const value = res.examData;
      if (value) {
        this.id = value._id;
        this.examForm = this.fb.group({
          slug: [value.slug],
          examCode: [value.examCode],
          examName: [value.examName],
          certificateName: [value.certificateName],
          question: [value.question],
          update: [value.update],
          price: [value.price],
          status: [value.status],
          isRetired: [value.isRetired],
        });
      }
    });
  }
  onDelete(id: String) {
    this._examService.deleteData(id).subscribe((res) => {
      console.log(res);
      this.successMessage = `Successfully Deleted from Exams`;
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    });
  }
  ngOnInit(): void {
    // exam
    this._examService.allExams().subscribe((res: any) => {
      const value = res.examData;

      return (this.exams = value);
    });
    // slug
    this._vendorService.getAll().subscribe((res: any) => {
      const value = res['allVendor'];
      return (this.vendor = value);
    });
    // certificate
    this._certification.getCertification().subscribe((res: any) => {
      const value = res['certification'];
      return (this.certificates = value);
    });
  }
}
