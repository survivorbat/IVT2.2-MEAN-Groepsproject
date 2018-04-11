import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageService } from './services/message.service';
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { ChatareaComponent } from './components/chatarea/chatarea.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputfieldComponent,
    ChatareaComponent
  ],
  declarations: [InputfieldComponent, ChatareaComponent],
  providers: [MessageService]
})
export class ChatmessageModule { }
