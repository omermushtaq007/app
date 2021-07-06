import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  mail = 'mailto:umermushtaq3424@gmail.com'
  public contactForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name:[''],
      email:[''],
      subject:[''],
      message:['']
    });
  }
  send(){
    console.log(this.contactForm.value);
    
  }
  ngOnInit(): void {}
}
