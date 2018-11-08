import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestReportService {

  requests: RequestReport[] = [
    {
      username: 'yangray1',
      description: 'This app looks bad.',
      content: { request: 'First of all, you were late. Second of all, you were late. Third of all, you were late.', type: 'request' }
    },
    {
      username: 'admin1',
      description: 'Test Request',
      content: {
        request: 'This is a test.',
        type: 'request'
      }
    },
    {
      username: 'yangray1', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
    {
      username: 'yangray1', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
    {
      username: 'yangray1', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
    {
      username: 'yangray1', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
  ];

  reports: RequestReport[] = [
    {
      username: 'yangray1',
      description: 'Inaccurate Review',
      content: {
        type: 'report',
        report: 'He doesn\'t even go to this school.',
        review: {
          username: 'yangray1', // If username is empty, this is an anon request
          description: 'This is an anonymous request.',
          content: { request: 'This is more anonymous content.', type: 'request' }
        }
      }
    },
  ];

  constructor() { }

  getAllRequests(): RequestReport[] {
    return this.requests;
  }

  getAllReports(): RequestReport[] {
    return this.reports;
  }

  saveReport(report: RequestReport) {
    this.reports.push(report);
  }

  saveRequest(request: RequestReport) {
    this.requests.push(request);
  }
}

export interface RequestReport {
  username: string;
  description: string;
  content: any;
}
