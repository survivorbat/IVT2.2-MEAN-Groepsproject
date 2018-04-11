import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatresourceModule } from '../chatresource/chatresource.module';

import { MessageService } from './services/message.service';
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { ChatareaComponent } from './components/chatarea/chatarea.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatresourceModule
  ],
  exports: [
    InputfieldComponent,
    ChatareaComponent
  ],
  declarations: [InputfieldComponent, ChatareaComponent],
  providers: [MessageService]
})
export class ChatmessageModule { }
