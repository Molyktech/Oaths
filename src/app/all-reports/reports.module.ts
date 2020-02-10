import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { ReportsComponent } from './reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from '../alert/alert.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgeViewComponent } from './reports/age-view/age-view.component';
import { MarriageViewComponent } from './reports/marriage-view/marriage-view.component';
import { GeneralViewComponent } from './reports/general-view/general-view.component';
import { NameViewComponent } from './reports/name-view/name-view.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransactionReportComponent, ReportsComponent, AgeViewComponent, MarriageViewComponent, GeneralViewComponent, NameViewComponent],
  imports: [CommonModule, ChartsModule, AlertModule, NgxPaginationModule, SharedModule, FormsModule]
})
export class ReportsModule {}
