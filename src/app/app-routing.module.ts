import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MarriageComponent } from "./templates/marriage/marriage.component";
import { NameChangeComponent } from "./templates/name-change/name-change.component";
import { GeneralFormComponent } from "./templates/general-form/general-form.component";
import { AgeDeclarationComponent } from "./templates/age-declaration/age-declaration.component";
import { RolesComponent } from "./roles/roles.component";
import { AddrolesComponent } from "./addroles/addroles.component";
import { CreateuserComponent } from "./createuser/createuser.component";
import { InstitutionComponent } from "./institution/institution.component";
import { ReportsComponent } from "./reports/reports.component";
import { PaymentsComponent } from "./payments/payments.component";
import { PrintComponent } from "./print/print.component";
// import { AuthGuard } from './util/auth.guard';
import { AuthGuard } from "./auth.guard";
import { CreateDocumentComponent } from "./create-document/create-document.component";
import { ChartsComponent } from "./charts/charts.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    data: { title: "Login Component" }
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login Component" }
  },
  {
    path: "navigation",
    component: NavigationComponent,
    // canActivate: [AuthGuard],
    data: { title: "Navigation Component" },
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { title: "Dashboard", read: true }
      },
      {
        path: "document",
        component: AgeDeclarationComponent,
        canActivate: [AuthGuard],
        data: { title: "Declaration of Age", read: true }
      },
      {
        path: "marriage",
        component: MarriageComponent,
        canActivate: [AuthGuard],
        data: { title: "Declaration of Marriage", read: true }
      },
      {
        path: "change-of-name",
        component: NameChangeComponent,
        canActivate: [AuthGuard],
        data: { title: "Change of Name", read: true }
      },
      {
        path: "general",
        component: GeneralFormComponent,
        canActivate: [AuthGuard],
        data: { title: "General form of Affidavit", read: true }
      },
      {
        path: "roles",
        component: RolesComponent,
        canActivate: [AuthGuard],
        data: { title: "Roles", read: true }
      },
      {
        path: "addroles",
        component: AddrolesComponent,
        canActivate: [AuthGuard],
        data: { title: "Addroles Component", read: true }
      },
      {
        path: "createuser",
        component: CreateuserComponent,
        canActivate: [AuthGuard],
        data: { title: "Create User", read: true }
      },
      {
        path: "institution",
        component: InstitutionComponent,
        canActivate: [AuthGuard],
        data: { title: "Institution", read: true }
      },
      {
        path: "reports",
        component: ReportsComponent,
        canActivate: [AuthGuard],
        data: { title: "Reports", read: true }
      },
      {
        path: "payments",
        component: PaymentsComponent,
        canActivate: [AuthGuard],
        data: { title: "Payments", read: true }
      },
      {
        path: "print",
        component: PrintComponent,
        canActivate: [AuthGuard],
        data: { title: "Print", read: true }
      },
      {
        path: "createdocument",
        component: CreateDocumentComponent,
        // canActivate:[AuthGuard],
        data: { title: "Create Document", read: true }
      },
      {
        path: "charts",
        component: ChartsComponent,
        // canActivate:[AuthGuard],
        data: { title: "Create Document", read: true }
      },
      { path: "**", redirectTo: "" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
