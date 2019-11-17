import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { User } from '../models/user';
import { DocumentService } from '../services/document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

  documentForm:FormGroup
  currentUser:User
  documentTypes
  document
  loading=false
  loading2=false

  constructor(
    private documentService: DocumentService,
    private modalService: NgbModal
  ) { 
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {

    this.documentForm=new FormGroup({
      institutionID: new FormControl(this.currentUser.institutionID),
      name: new FormControl(''),
      fee: new FormControl(''),
      revenueCode: new FormControl('')
    })
    this.getDocumentsByInstitutionID()
  }

  saveDocument(){
    this.loading=true
    this.documentService.saveDocumentType(this.documentForm.value).subscribe(data=>{
      this.loading=false
      this.documentForm.reset()
      this.getDocumentsByInstitutionID()
    },
    err=>{

    })
  }

  getDocumentsByInstitutionID(){
    this.documentService.getDocumentTypesByInstitution(this.currentUser.institutionID).subscribe(data=>{
      this.documentTypes=data
    },
      err=>{
      })
  }

  editDocument(document){
    this.document=document
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateDocument(){
    this.loading2=true
    this.documentService.updateDocumentType(this.document).subscribe(data=>{
      this.loading2=false
      this.modalService.dismissAll()
    },
      err=>{
      })
  }

}
