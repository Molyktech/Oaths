import { Component, OnInit } from "@angular/core";
import { ReportsService } from "src/app/services/reports.service";
import { User } from "src/app/models/user";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogComponent } from "./../../mat-dialog/mat-dialog.component";
import { ToastService } from "./../../services/toast.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-transaction-report",
  templateUrl: "./transaction-report.component.html",
  styleUrls: ["./transaction-report.component.scss"]
})
export class TransactionReportComponent implements OnInit {
  currentUser: User;
  reports: any;
  searchText = "";
  config: any;
  fetching = false;
  constructor(
    private reportService: ReportsService,
    private dialog: MatDialog,
    public toastService: ToastService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.getTransactionReport();
  }

  openDialog(title, msg): void {
    this.dialog.open(MatDialogComponent, {
      width: "250px",
      data: { title, msg }
    });
  }

  getTransactionReport() {
    this.fetching = true;
    this.reportService
      .getTransactionReport(this.currentUser.institutionID)
      .subscribe(
        res => {
          this.reports = res;
          this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.reports.length
          };
          this.fetching = false;
        },
        error => {
          this.fetching = false;
          this.toastService.show(`${error.statusText}`, {
            classname: "bg-danger text-light",
            delay: 3000,
            autohide: true,
            headertext: "Error!!!"
          });
          this.openDialog(
            "Transaction Report",
            `Failed  to fetch report: ${error.statusText}`
          );
        }
      );
  }
  applyFilter(filterValue: string) {
    this.reports.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
