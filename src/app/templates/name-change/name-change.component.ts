import { Component, OnInit } from '@angular/core';
import { InstitutionService } from './../../services/institution.service';
import { User } from './../../models/user';
import { Institution } from 'src/app/models/institution';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { MatDialogComponent } from './../../mat-dialog/mat-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { DocumentService } from '../../services/document.service';
import { ToastService } from './../../services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.scss']
})
export class NameChangeComponent implements OnInit {
  currentUser: User;
  institution: Institution;
  nameForm: FormGroup;
  loading = false;
  submitted = false;
  response:any;
  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private documentService: DocumentService,
    public toastService: ToastService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }
  ngOnInit() {
    this.getInstitution();
    this.nameForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      formerlyCalled: ['', Validators.required],
      nowCalled: ['', Validators.required],
      date: ['', Validators.required],
      courtName: ['', Validators.required],
      fromLanguage: [''],
      toLanguage: [''],
      interpreter: [''],
      presentDay:['', Validators.required],
      presentMonthYear:['', Validators.required]
    });
  }

  get f() {
    return this.nameForm.controls;
  }

  getInstitution() {
    this.institutionService
      .getInstitutionById(this.currentUser.institutionID)
      .subscribe(res => {
        this.institution = res as Institution;
      });
  }
  openDialog(title, msg): void {
    this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: { title, msg }
    });
  }


  onSubmit(f) {
    this.submitted=true
    if(this.nameForm.valid){
        this.loading = true;
        const obj = this.nameForm.value;
        obj.staffId = this.currentUser.id;
        obj.institutionId = this.currentUser.institutionID;
        this.documentService.saveChangeOfName(obj).subscribe(
          res => {
            //console.log(res)
            this.response=res
            this.loading = false;
            //console.log(obj);
            this.openDialog('Change of Name', `Saved Succesfully`);
            this.toastService.show('Saved Succesfully', {
              classname: 'bg-success text-light',
              delay: 10000,
              autohide: true,
              headertext: 'Change of Name'
            });

            this.open(f)
            this.reset()

            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          },
          error => {
            console.log(error);
            this.loading = false;
            this.openDialog('Change of Name', `Failed ${error.statusText}`);
            this.toastService.show(`${error.statusText}`, {
              classname: 'bg-danger text-light',
              delay: 10000,
              autohide: true,
              headertext: 'Error!!!'
            });
            window.scrollTo(0, 0);
          }
        );
    }
    
  }

  reset() {
    this.submitted = false;
    this.nameForm.reset();
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }
}
