import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarriageComponent } from './templates/marriage/marriage.component';
import { NameChangeComponent } from './templates/name-change/name-change.component';
import { GeneralFormComponent } from './templates/general-form/general-form.component';
import { AgeDeclarationComponent } from './templates/age-declaration/age-declaration.component';
import { RolesComponent } from './roles/roles.component';
import { AddrolesComponent } from './addroles/addroles.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { InstitutionComponent } from './institution/institution.component';
import { ReportsComponent } from './reports/reports.component';
import { PaymentsComponent } from './payments/payments.component';
import { PrintComponent } from './print/print.component';
import { AuthGuard } from './util/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login Component' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login Component' }
  },
  {
    path: 'navigation',
    component: NavigationComponent,
    // canActivate: [AuthGuard],
    data: { title: 'Navigation Component' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dash' }
      },
      {
        path: 'document',
        component: AgeDeclarationComponent,
        data: { title: 'Age' }
      },
      {
        path: 'marriage',
        component: MarriageComponent,
        data: { title: 'Dash' }
      },
      {
        path: 'change-of-name',
        component: NameChangeComponent,
        data: { title: 'Dash' }
      },
      {
        path: 'general',
        component: GeneralFormComponent,
        data: { title: 'Dash' }
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: { title: 'Roles Component' }
      },
      {
        path: 'addroles',
        component: AddrolesComponent,
        data: { title: 'Addroles Component' }
      },
      {
        path: 'createuser',
        component: CreateuserComponent,
        data: { title: 'Createuser Component' }
      },
      {
        path: 'institution',
        component: InstitutionComponent,
        data: { title: 'Institution Component' }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: { title: 'Reports Component' }
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        data: { title: 'Payments Component' }
      },
      {
        path: 'print',
        component: PrintComponent,
        data: { title: 'Print Component' }
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
