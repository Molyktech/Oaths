import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../services/charts.service';
import { ReportsService } from '../services/reports.service';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  bigChart = [];
  cards = [];
  pieChart = [];
  barChart = [];
  paidLength;
  unpaidLength;
  reports: any;
  currentUser: User;
  users: any;
  constructor(
    private chartService: ChartsService,
    private reportsService: ReportsService,
    private loginService: LoginService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.bigChart = this.chartService.bigChart();
    this.cards = this.chartService.cards();
    this.pieChart = this.chartService.pieChart();
    this.barChart = this.chartService.barChart();
    this.getReports();
  }

  getReports() {
    this.reportsService
      .getReports(this.currentUser.institutionID, 0, 0)
      .subscribe(
        data => {
          this.reports = data as any;
          const paid = this.reports.filter(x => {
            return x.isPaid === true;
          });
          const unpaid = this.reports.filter(x => {
            return x.isPaid === false;
          });
          this.paidLength = paid.length;
          this.unpaidLength = unpaid.length;
        },
        err => {
          console.log(err);
        }
      );
  }

  getUsersByInstittutionId() {
    this.loginService
      .getUsers(this.currentUser.institutionID)
      .subscribe(data => {
        const users = data as User[];
        this.users = users.length;
      });
  }
}
