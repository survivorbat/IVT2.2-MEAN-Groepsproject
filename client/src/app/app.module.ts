import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChatboxModule } from './chatbox/chatbox.module';
import { ChatmessageModule } from './chatmessage/chatmessage.module';
import { ChatresourceModule } from './chatresource/chatresource.module';
import { UiModule } from './ui/ui.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatboxModule,
    ChatmessageModule,
    ChatresourceModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
