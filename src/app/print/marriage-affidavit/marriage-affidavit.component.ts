import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Institution } from 'src/app/models/institution';
import { InstitutionService } from 'src/app/services/institution.service';

@Component({
  selector: 'app-marriage-affidavit',
  templateUrl: './marriage-affidavit.component.html',
  styleUrls: ['./marriage-affidavit.component.scss']
})
export class MarriageAffidavitComponent implements OnInit {
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
