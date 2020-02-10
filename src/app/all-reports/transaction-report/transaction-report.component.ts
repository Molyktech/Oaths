import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { User } from 'src/app/models/user';
import { TransactionReport } from 'src/app/models/transactionReport';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatDialogComponent } from './../../mat-dialog/mat-dialog.component';
import { ToastService } from './../../services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss']
})
export class TransactionReportComponent implements OnInit {
  currentUser: User;
  reports: any;
  transactionSummary;
  startDate;
  endDate;
  constructor(private reportService: ReportsService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getTransactionReport();
    this.getTransactionSummary()
  }

  getTransactionReport() {
    this.reportService
      .getTransactionReport(this.currentUser.institutionID)
      .subscribe(res => {
        this.reports = res;
      });
  }

  getTransactionSummary(){
    this.reportService.getTransactionSummaryReport(this.currentUser.institutionID,'0','0').subscribe(data=>{
      this.transactionSummary=data
    })
  }

  filterByDate(){
    let s = this.startDate.split('-')
    let startdate = `${s[2]}-${s[1]}-${s[0]}`
    let e = this.endDate.split('-')
    let enddate = `${e[2]}-${e[1]}-${e[0]}`
    this.reportService.getTransactionSummaryReport(this.currentUser.institutionID,startdate,enddate).subscribe(data=>{
      this.transactionSummary=data
    })
  }
}
