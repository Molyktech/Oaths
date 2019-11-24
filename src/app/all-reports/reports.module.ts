import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { ReportsComponent } from './reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from '../alert/alert.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastModule } from '../toast/toast.module';

@NgModule({
  declarations: [TransactionReportComponent, ReportsComponent],
  imports: [
    CommonModule,
    ChartsModule,
    AlertModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    ToastModule
  ]
})
export class ReportsModule {}
