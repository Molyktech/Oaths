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
  constructor(private reportService: ReportsService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getTransactionReport();
  }

  getTransactionReport() {
    this.reportService
      .getTransactionReport(this.currentUser.institutionID)
      .subscribe(res => {
        this.reports = res;
        console.log(this.reports);
      });
  }
}
