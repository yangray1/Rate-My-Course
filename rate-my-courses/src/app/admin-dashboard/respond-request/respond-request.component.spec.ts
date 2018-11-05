import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondRequestComponent } from './respond-request.component';

describe('RespondRequestComponent', () => {
  let component: RespondRequestComponent;
  let fixture: ComponentFixture<RespondRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
