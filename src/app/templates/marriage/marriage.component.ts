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
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Print } from '../../util/print';

@Component({
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.scss']
})
export class MarriageComponent implements OnInit {
  currentUser: User;
  institution: Institution;
  marriageForm: FormGroup;
  response;
  submitted = false;
  loading = false;

  constructor(
    private institutionService: InstitutionService,
    private documentService: DocumentService,
    public toastService: ToastService,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private fb: FormBuilder,
    config: NgbModalConfig
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }
  ngOnInit() {
    this.getInstitution();
    this.marriageForm = this.fb.group({
      husband: ['', Validators.required],
      wife: ['', Validators.required],
      witnessName: ['', Validators.required],
      witnessStreet: ['', Validators.required],
      witnessCountry: ['', Validators.required],
      witnessReligion: ['', Validators.required],
      relationship: ['', Validators.required],
      declarant: ['', Validators.required],
      date: ['', Validators.required],
      presentDay: ['', Validators.required],
      marriageDay: ['', Validators.required],
      marriageMonthYear: ['', Validators.required],
      presentMonthYear: ['', Validators.required],
      courtName: ['', Validators.required],
      fromLanguage: ['', Validators.required],
      toLanguage: ['', Validators.required],
      interpreter: ['', Validators.required],
      countryRelationship: ['', Validators.required]
    });
  }

  get f() {
    return this.marriageForm.controls;
  }
  getInstitution() {
    this.institutionService
      .getInstitutionById(this.currentUser.institutionID)
      .subscribe(res => {
        this.institution = res as Institution;
      });
  }

  save(modal) {
    this.submitted = true;
    if (this.marriageForm.invalid) {
      return;
    }
    this.loading = true;
    const obj = this.marriageForm.value;
    obj.staffId = this.currentUser.id;
    obj.institutionId = this.currentUser.institutionID;
    this.documentService.saveMarriageDeclaration(obj).subscribe(
      data => {
        this.response = data;
        console.log(data);
        this.loading = false;

        this.toastService.show('Saved Succesfully', {
          classname: 'bg-success text-light',
          delay: 10000,
          autohide: true,
          headertext: 'Declaration of Marriage'
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
        this.openDialog(
          'Declaration of Marriage',
          `Failed ${error.statusText}`
        );
      }
    );
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  reset() {
    this.submitted = false;
    this.marriageForm.reset();
  }

  openDialog(title, msg): void {
    this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: { title, msg }
    });
  }
  onPrint(id) {
    Print.print(id);
  }
}
