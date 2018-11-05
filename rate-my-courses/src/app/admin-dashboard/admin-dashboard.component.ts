import { RequestReportService } from './../_services/request-report.service';
import { UsersService } from './../_services/users.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RespondRequestComponent } from './respond-request/respond-request.component';
import { RespondReportComponent } from './respond-report/respond-report.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  displayedColumns: string[] = ['username', 'description'];
  cards: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UsersService,
    private requestReportService: RequestReportService,
    private matDialog: MatDialog,
  ) {
    this.setCards();
  }

  select(row: any) {
    let matDialogRef: MatDialogRef<any>;
    if (row.content.type === 'user') {
      matDialogRef = this.matDialog.open(
        EditUserComponent,
        {
          data: row.content.user,
          width: '500px',
        }
      );
      matDialogRef.afterClosed().subscribe((_) => {
        this.setCards();
      });
    } else if (row.content.type === 'request') {
      matDialogRef = this.matDialog.open(
        RespondRequestComponent,
        { data: row.content }
      );
    } else if (row.content.type === 'report') {
      matDialogRef = this.matDialog.open(
        RespondReportComponent,
        {
          data: row.content,
          width: '500px',
        }
      );
    }
  }

  setCards() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {

        const allUsers: TableData[] = [];

        this.userService.getAllUsers().forEach(user => {
          allUsers.push({
            username: user.username,
            description: user.firstName + ' ' + user.lastName,
            content: { type: 'user', user: user }
          });
        });

        if (matches) {
          return [
            { title: 'Requests', cols: 3, rows: 1, tableData: this.requestReportService.getAllRequests() },
            { title: 'Reports', cols: 3, rows: 2, tableData: this.requestReportService.getAllReports() },
            { title: 'Users', cols: 3, rows: 1, tableData: allUsers },
          ];
        } else {
          return [
            { title: 'Requests', cols: 1, rows: 1, tableData: this.requestReportService.getAllRequests() },
            { title: 'Reports', cols: 2, rows: 2, tableData: this.requestReportService.getAllReports() },
            { title: 'Users', cols: 1, rows: 1, tableData: allUsers },
          ];
        }
      })
    );
  }
}

export interface TableData {
  username: string;
  description: string;
  content: any;
}
