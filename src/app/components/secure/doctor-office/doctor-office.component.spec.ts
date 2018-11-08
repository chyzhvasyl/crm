import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOfficeComponent } from './doctor-office.component';

describe('DoctorOfficeComponent', () => {
  let component: DoctorOfficeComponent;
  let fixture: ComponentFixture<DoctorOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
