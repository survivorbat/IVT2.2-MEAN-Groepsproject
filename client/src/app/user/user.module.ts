import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MeComponent } from './components/me/me.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [LoginComponent, RegisterComponent, MeComponent],
  exports:[LoginComponent, MeComponent],
  providers: [UserService]
})
export class UserModule { }
