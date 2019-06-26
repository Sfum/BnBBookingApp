import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsListComponent } from './hospitals-list.component';

describe('HospitalListComponent', () => {
  let component: HospitalsListComponent;
  let fixture: ComponentFixture<HospitalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
