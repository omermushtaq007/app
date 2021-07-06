import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVendorComponent } from './single-vendor.component';

describe('SingleVendorComponent', () => {
  let component: SingleVendorComponent;
  let fixture: ComponentFixture<SingleVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
