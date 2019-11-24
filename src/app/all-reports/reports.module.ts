import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { ReportsComponent } from './reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from '../alert/alert.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [TransactionReportComponent, ReportsComponent],
  imports: [CommonModule, ChartsModule, AlertModule, NgxPaginationModule]
})
export class ReportsModule {}
