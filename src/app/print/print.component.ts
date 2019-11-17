import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { AlertService } from '../services/alert.service';
import { Print } from '../util/print';
import { User } from '../models/user';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  affidavit: any;
  currentUser: User;

  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required])
    });
  }
  get search() {
    return this.searchForm.get('search');
  }

  openDialog(title, msg): void {
    this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: { title, msg }
    });
  }

  getDocument() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.loading = true;
    const num = this.searchForm.get('search').value;
    this.documentService.getDocumentByRef(num).subscribe(
      res => {
        this.affidavit = res;
        console.log(res);
        this.openDialog('Court Affidavit', res['message']);
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.alertService.error(`Error: ${error.statustext}`);
        this.openDialog('Court Affidavit', `Failed ${error.statusText}`);
      }
    );

    console.log(this.searchForm.get('search').value);
    // this.submitted = true;
    // if (this.searchForm.invalid) {
    //   return;
    // }
    // this.loading = true;
    // this.documentService.getDocumentByRef(this.searchForm.value).subscribe(
    //   res => {
    //     this.affidavit = res;
    //     console.log(this.searchForm.value);
    //     this.openDialog('Court Affidavit', `Success`);
    //     this.loading = false;
    //   },
    //   error => {
    //     this.loading = false;
    //     this.alertService.error(`Error: ${error.statustext}`);
    //     this.openDialog('Court Affidavit', `Failed ${error.statusText}`);
    //   }
    // );
  }

  print(id) {
    Print.printDocument(id);
    this.documentService
      .updatePrint(this.affidavit.affidavitReferenceNumber, this.currentUser.id)
      .subscribe(res => console.log(res));
  }
}
