import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './components/public/public.component';
import { PrivateComponent } from './components/private/private.component';

import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'm', redirectTo:'m/0'},
  { path: 'm/:chatboxid', component: PrivateComponent},
  { path: '', component: PublicComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
