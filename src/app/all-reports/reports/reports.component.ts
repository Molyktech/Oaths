import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  currentUser: User;
  reports;

  paidLength;
  unpaidLength;
  public doughnutChartLabels = ['Total Paid', 'Total Unpaid'];
  public doughnutChartData = [this.paidLength, this.unpaidLength];
  public doughnutChartType = 'doughnut';

  p: number = 1;
  collection: any[];  

  constructor(private reportsService: ReportsService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.reportsService
      .getReports(this.currentUser.institutionID, 0, 0)
      .subscribe(
        data => {
          this.reports = <any>data;
          let paid = this.reports.filter(x => {
            return x.isPaid == true;
          });
          let unpaid = this.reports.filter(x => {
            return x.isPaid == false;
          });
          this.paidLength = paid.length;
          this.unpaidLength = unpaid.length;
          this.doughnutChartData = [this.paidLength, this.unpaidLength];
        },
        err => {
          console.log(err);
        }
      );
  }

  getDate(a) {
    return a.split('T')[0];
  }
}
