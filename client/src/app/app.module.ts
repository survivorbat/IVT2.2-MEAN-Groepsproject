import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatboxModule } from './chatbox/chatbox.module';
import { ChatmessageModule } from './chatmessage/chatmessage.module';
import { ChatresourceModule } from './chatresource/chatresource.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatboxModule,
    ChatmessageModule,
    ChatresourceModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
