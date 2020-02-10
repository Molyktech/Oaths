import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarriageComponent } from './marriage/marriage.component';
import { NameChangeComponent } from './name-change/name-change.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { AgeDeclarationComponent } from './age-declaration/age-declaration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from './../toast/toast.module';
import { AlertModule } from './../alert/alert.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material-module';

@NgModule({
  declarations: [
    MarriageComponent,
    NameChangeComponent,
    GeneralFormComponent,
    AgeDeclarationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AlertModule,
    SharedModule,
    NgbModule,
    MaterialModule
  ]
})
export class TemplatesModule {}
