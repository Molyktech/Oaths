import { Component, OnInit, Input } from '@angular/core';
import { Institution } from '../../../models/institution';
import { User } from '../../../models/user';
import { InstitutionService } from '../../../services/institution.service';

@Component({
  selector: 'app-name-view',
  templateUrl: './name-view.component.html',
  styleUrls: ['./name-view.component.scss']
})
export class NameViewComponent implements OnInit {
  @Input() affidavit:any

  institution:Institution
  currentUser:User

  constructor(
    private institutionService:InstitutionService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  ngOnInit() {
    this.getInstitution()
  }

  getInstitution() {
    this.institutionService
      .getInstitutionById(this.currentUser.institutionID)
      .subscribe(res => {
        this.institution = res as Institution;
      });
  }

}
