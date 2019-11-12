import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrintComponent } from "./print.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "../alert/alert.module";
import { SharedModule } from "../shared/shared.module";
import { AgeAffidavitComponent } from "./age-affidavit/age-affidavit.component";

@NgModule({
  declarations: [PrintComponent, AgeAffidavitComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    SharedModule
  ]
})
export class PrintModule {}
