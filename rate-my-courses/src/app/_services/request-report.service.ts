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
      username: '', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
{
      username: '', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
{
      username: '', // If username is empty, this is an anon request
      description: 'This is an anonymous request.',
      content: { request: 'This is more anonymous content.', type: 'request' }
    },
    {
      username: '', // If username is empty, this is an anon request
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
        reported: 'wongma73',
        request: 'He doesn\'t even go to this school.',
        review: {
          title: 'I HATE THIS CLASS',
          content: 'This class sucks so much.'
        }
      }
    },
  ];

  constructor() {}

  getAllRequests(): RequestReport[] {
    return this.requests;
  }

  getAllReports(): RequestReport[] {
    return this.reports;
  }
}

export interface RequestReport {
  username: string;
  description: string;
  content: any;
}
