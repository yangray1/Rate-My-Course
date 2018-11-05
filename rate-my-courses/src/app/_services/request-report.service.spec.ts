import { TestBed } from '@angular/core/testing';

import { RequestReportService } from './request-report.service';

describe('RequestReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestReportService = TestBed.get(RequestReportService);
    expect(service).toBeTruthy();
  });
});
