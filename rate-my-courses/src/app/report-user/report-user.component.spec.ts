import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserComponent } from './report-user.component';

describe('ReportUserComponent', () => {
  let component: ReportUserComponent;
  let fixture: ComponentFixture<ReportUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
