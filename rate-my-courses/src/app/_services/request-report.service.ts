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
        review: { id: 2, course: "CSC207", reviewer: "yangray1", profName: "Ray Mond", overallRating: 2, difficulty: 4, workload: 4, hoursPerWeek: 20, textbookUsed: true, gradeReceived: "B", writtenReview: "this course is so hard :( this review is hardcoded", score: 0 }
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

  removeReport(report: RequestReport) {
    this.reports = this.reports.filter(e => e !== report);
  }
}

export interface RequestReport {
  username: string;
  description: string;
  content: any;
}
