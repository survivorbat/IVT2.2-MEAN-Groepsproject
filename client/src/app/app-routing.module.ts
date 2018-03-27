import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './components/public/public.component';
import { PrivateComponent } from './components/private/private.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'm', component: PrivateComponent },
  { path: '', component: PublicComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
