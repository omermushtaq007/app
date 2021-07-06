import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  // Get Current Year
  year;
  
  constructor() {
    this.year = this.getCurrentYear();
  }

  getCurrentYear() {
    let year = new Date();
    return year.getFullYear()
  }

  ngOnInit(): void {}
}
