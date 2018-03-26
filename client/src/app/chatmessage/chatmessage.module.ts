import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageService } from './services/message.service';
import { InputfieldComponent } from './components/inputfield/inputfield.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputfieldComponent  
  ],
  declarations: [InputfieldComponent],
  providers: [MessageService]
})
export class ChatmessageModule { }
