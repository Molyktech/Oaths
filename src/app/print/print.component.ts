import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { AlertService } from '../services/alert.service';

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

  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

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
        this.openDialog('Court Affidavit', `Success`);
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.alertService.error(`Error: ${error.statustext}`);
        this.openDialog('Court Affidavit', `Failed ${error.statusText}`);
      }
    );
  }

  print() {
    let printContent, WindowPrt;
    printContent = document.getElementById('affidavit').innerHTML;
    WindowPrt = window.open(
      '',
      '_blank',
      'top=0,left=0,height=100%,width=auto'
    );
    WindowPrt.document.open();

    WindowPrt.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          .paper {
            position: relative;
            margin: 40px auto;
            width: 600px;
            height: auto;
            background: #fff;
            border-radius: 2px;
            padding: 5px 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
            -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
            -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
            -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6)
          }

          .paper::before,
          .paper::after {
            content: '';
            position: absolute;
            bottom: 10px;
            width: 40%;
            height: 10px;
            box-shadow: 0 5px 14px rgba(0, 0, 0, .7);
            z-index: -1;
            transition: all .3s ease-in-out;
          }

          .paper::before {
            left: 15px;
            transform: skew(-5deg) rotate(-5deg);
          }

          .paper::after {
            right: 15px;
            transform: skew(5deg) rotate(5deg);
          }

          .paper:hover::before,
          .paper:hover::after {
            box-shadow: 0 2px 14px rgba(0, 0, 0, .4);
          }

          .paper:hover::before {
            left: 5px;
          }

          .paper:hover::after {
            right: 5px;
          }

          .header {
            margin: 15px;
            display: flex;
            justify-content: center;
            text-align:center;

          }

          .header img {
            width: 50px;
            height: auto;
            padding:0 10px;
          }

          .header h5 {
            font-weight: 600;
          }

          .panel {
            background-color: green;
            padding: 7px;
            font-weight: 700;
            text-align: center
          }

          .panel p {
            text-transform: uppercase;
          }

          .declaration {
            margin-top: 10px;
          }
          .declaration p {
            font-size: 1.1em;
          }
          .twins {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
          }

          .c3 {
            // flex-grow: 1;
            margin-top: 5px;
          }

          .c4 {
            flex-grow: 2;
          }

          .c8 {
            flex-grow: 3;
          }

          .c9 {
            flex-grow: 3
          }

          ol,
          li {
            margin: 5px;
            padding: 5px;
          }

          input.signature {
            border: none;

          }

          input.signature1 {
            border-bottom: 1px solid black
          }

          input.signature:focus {
            outline: none;
          }

          input.signature2 {
            border-bottom: 1px dotted black;
          }

          .footer {
            display: flex;

          }
          .thumb-print{
            margin-top: 10px;
            margin-left: 5px;
          }
          .oath-head{
            display: flex;
            justify-content:flex-end;
            margin-top: 5px;
          }

          .oath {
            border: 2px solid rgb(65, 65, 65);
            color: #fff;
            padding: 4px 2px 0 2px;
            font-weight: 900;

            background: rgb(65, 65, 65);
          }

          .oath p {
            margin: auto;
          }

          </style>
        </head>
    <body onload="window.print();window.close()">${printContent}</body>
      </html>`);
  }
  //
}
