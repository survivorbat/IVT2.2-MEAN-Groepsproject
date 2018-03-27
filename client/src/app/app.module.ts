import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ChatboxModule } from './chatbox/chatbox.module';
import { ChatmessageModule } from './chatmessage/chatmessage.module';
import { ChatresourceModule } from './chatresource/chatresource.module';
import { AppRoutingModule } from './/app-routing.module';
import { PrivateComponent } from './components/private/private.component';
import { PublicComponent } from './components/public/public.component';

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    ChatboxModule,
    ChatmessageModule,
    ChatresourceModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
