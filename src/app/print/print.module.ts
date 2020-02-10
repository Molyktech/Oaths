import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';
import { SharedModule } from '../shared/shared.module';
import { AgeAffidavitComponent } from './age-affidavit/age-affidavit.component';
import { MarriageAffidavitComponent } from './marriage-affidavit/marriage-affidavit.component';
import { GeneralAffidavitComponent } from './general-affidavit/general-affidavit.component';
import { NameAffidavitComponent } from './name-affidavit/name-affidavit.component';

@NgModule({
  declarations: [
    PrintComponent,
    AgeAffidavitComponent,
    MarriageAffidavitComponent,
    GeneralAffidavitComponent,
    NameAffidavitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    SharedModule
  ]
})
export class PrintModule {}
