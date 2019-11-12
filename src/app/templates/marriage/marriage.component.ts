import { Component, OnInit } from '@angular/core';
import { InstitutionService } from './../../services/institution.service';
import { User } from './../../models/user';
import { Institution } from 'src/app/models/institution';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { ToastService } from '../../services/toast.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from './../../mat-dialog/mat-dialog.component';

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
  submitted=false;
  loading=false
  constructor(
    private institutionService: InstitutionService,
    private documentService: DocumentService,
    public toastService: ToastService,
    private modalService: NgbModal,
    private dialog: MatDialog,
    config: NgbModalConfig
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }
  ngOnInit() {
    this.getInstitution();
    this.marriageForm= new FormGroup({
      id: new FormControl(0),
      husband: new FormControl (''),
      wife: new FormControl (''),
      witnessName: new FormControl(''),
      witnessCountry: new FormControl (''),
      address: new FormControl(''),
      witnessReligion: new FormControl(''),
      now: new FormControl(''),
      hn: new FormControl(''),
      wn: new FormControl(''),
      day: new FormControl(''),
      my: new FormControl(''),
      venue: new FormControl(''),
      date: new FormControl(''),
      institutionId: new FormControl(this.currentUser.institutionID),
      fromLanguage: new FormControl(''),
      toLanguage: new FormControl(''),
      interpreter: new FormControl(''),
      staffID: new FormControl(this.currentUser.id),
      relationship: new FormControl(''),
      courtName: new FormControl(this.currentUser.institution.name),
      amountPaid: new FormControl(''),
      tellerNumber: new FormControl('')
    })
  }

  getInstitution() {
    this.institutionService
      .getInstitutionById(this.currentUser.institutionID)
      .subscribe(res => {
        this.institution = res as Institution;
      });
  }

  save(modal){
    console.log(this.marriageForm.value)
    this.documentService.saveMarriageDeclaration(this.marriageForm.value).subscribe(data=>{
      this.response = data;
      console.log(data);
      this.loading = false;
      // this.openDialog('Declaration of Age', `Saved Succesfully`);
      this.toastService.show('Saved Succesfully', {
        classname: 'bg-success text-light',
        delay: 10000,
        autohide: true,
        headertext: 'Declaration of Age'
      });

      this.open(modal);
      this.reset();
      //console.log(data)
    },
      error=>{
        console.log(error);
        this.loading = false;
        this.toastService.show(`${error.statusText}`, {
          classname: 'bg-danger text-light',
          delay: 2000,
          autohide: true,
          headertext: 'Error!!!'
        });
        this.openDialog('Declaration of Age', `Failed ${error.statusText}`);
        //console.log(error)
    })
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  reset() {
    this.submitted = false;
    //this.ageForm.reset();
  }

  openDialog(title, msg): void {
    this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: { title, msg }
    });
  }
}
