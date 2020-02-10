import { Component, OnInit } from '@angular/core';
import { InstitutionService } from './../../services/institution.service';
import { User } from './../../models/user';
import { Institution } from 'src/app/models/institution';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatDialogComponent } from './../../mat-dialog/mat-dialog.component';
import { DocumentService } from '../../services/document.service';
import { ToastService } from './../../services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Print } from '../../util/print';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss']
})
export class GeneralFormComponent implements OnInit {
  currentUser: User;
  institution: Institution;
  generalForm: FormGroup;
  submitted = false;
  loading = false;
  response: any;
  thats=[];
  items:FormArray;
  constructor(
    private institutionService: InstitutionService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private documentService: DocumentService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }
  ngOnInit() {
    this.getInstitution();
    this.generalForm = this.fb.group({
      relativeName: ['', Validators.required],
      address: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required],
      line4: ['', Validators.required],
      line5: ['', Validators.required],
      line: this.fb.array([ this.createItem() ]),
      date: ['', Validators.required],
      courtName: ['', Validators.required],
      fromLanguage: ['', Validators.required],
      toLanguage: ['', Validators.required],
      interpreter: ['', Validators.required],
      presentDay: ['', Validators.required],
      presentMonthYear: ['', Validators.required]
    });
  }
  get f() {
    return this.generalForm.controls;
  }

  getInstitution() {
    this.institutionService
      .getInstitutionById(this.currentUser.institutionID)
      .subscribe(res => {
        this.institution = res as Institution;
      });
  }
  onSubmit(modal) {
    this.submitted = true;
    if (this.generalForm.invalid) {
      return;
    }
    this.loading = true;
    const obj = this.generalForm.value;
    obj.staffId = this.currentUser.id;
    obj.institutionId = this.currentUser.institutionID;
    //console.log(obj)
    obj.line=[{that:obj.line1},{that:obj.line2},{that:obj.line3},{that:obj.line4},{that:obj.line5},...obj.line]
    this.documentService.saveGeneralAffidavit(obj).subscribe(
      res => {
        this.response = res;
        console.log(res);
        this.loading = false;
        this.toastService.show('Saved Succesfully', {
          classname: 'bg-success text-light',
          delay: 10000,
          autohide: true,
          headertext: 'General Affidavit'
        });
        this.open(modal);
        this.reset();
      },
      error => {
        console.log(error);
        this.loading = false;
        this.toastService.show(`${error.statusText}`, {
          classname: 'bg-danger text-light',
          delay: 2000,
          autohide: true,
          headertext: 'Error!!!'
        });
        this.openDialog('General Affidavit', `Failed ${error.statusText}`);
      }
    );
  }

  onPrint(id) {
    Print.print(id);
  }

  openDialog(title, msg): void {
    this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: { title, msg }
    });
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  reset() {
    this.submitted = false;
    this.generalForm.reset();
  }

  addThat(){
    this.thats.push(6)
  }

  createItem(): FormGroup {
    return this.fb.group({
      that: ''
    });
  }

  addItem(): void {
    this.items = this.generalForm.get('line') as FormArray;
    this.items.push(this.createItem());
  }
}
