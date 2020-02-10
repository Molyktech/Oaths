import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { User } from '../../models/user';
import { DocumentService } from '../../services/document.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  currentUser: User;
  reports;
  showReport:boolean=true;
  loading:boolean=false;

  paidLength;
  unpaidLength;
  affidavit;
  public doughnutChartLabels = ['Total Paid', 'Total Unpaid'];
  public doughnutChartData = [this.paidLength, this.unpaidLength];
  public doughnutChartType = 'doughnut';

  p: number = 1;
  collection: any[];  

  constructor(
    private reportsService: ReportsService,
    private documentService: DocumentService) {
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

  viewAffidavit(arn){
    this.loading=true
    this.documentService.getDocumentByRef(arn).subscribe(data=>{
      this.loading=false
      this.affidavit=data
      this.showReport=false
    },
      err=>{
        console.log(err)
      })
  }
  backToReports(){
    this.showReport=true
    this.affidavit=null
  }
}
