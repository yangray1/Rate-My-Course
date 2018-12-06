import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RequestReportService {

  private API = "http://localhost:3000";

  // private API = 'https://rate-my-courses.herokuapp.com';
  private reportRequestAPI = this.API + "/api/requestsReports";

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<RequestReport[]> {
    return this.http.get<RequestReport[]>(
      this.reportRequestAPI + "/allRequestsReports/request",
      this.getHttpHeaders()
    );
    // return this.requests;
  }

  getAllReports(): Observable<RequestReport[]> {
    return this.http.get<RequestReport[]>(
      this.reportRequestAPI + "/allRequestsReports/report",
      this.getHttpHeaders()
    );
  }

  saveRequestReport(report: RequestReport) {
    return this.http.patch<RequestReport>(
      this.reportRequestAPI + "/modifyRequestReport", report,
      this.getHttpHeaders()
    );
  }

  newRequestReport(report: RequestReport) {
    return this.http.post<RequestReport>(
      this.reportRequestAPI + "/newRequestReport", report,
      this.getHttpHeaders()
    );
  }

  private getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || ""
      })
    };
  }
}

export interface RequestReport {
  username: string;
  description: string;
  resolved: boolean;
  type: string;
  content: any;
}
