import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondReportComponent } from './respond-report.component';

describe('RespondReportComponent', () => {
  let component: RespondReportComponent;
  let fixture: ComponentFixture<RespondReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
