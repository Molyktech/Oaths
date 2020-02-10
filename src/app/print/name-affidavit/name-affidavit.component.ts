import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Institution } from 'src/app/models/institution';
import { InstitutionService } from 'src/app/services/institution.service';

@Component({
  selector: 'app-name-affidavit',
  templateUrl: './name-affidavit.component.html',
  styleUrls: ['./name-affidavit.component.scss']
})
export class NameAffidavitComponent implements OnInit {
  @Input() affidavit: any;
  currentUser: User;
  institution: Institution;
  constructor(private institutionService: InstitutionService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  ngOnInit() {
    this.getInstitution();
  }

  getInstitution() {
    this.institutionService
      .getInstitutionById(this.currentUser.institutionID)
      .subscribe(res => {
        this.institution = res as Institution;
      });
  }
}
