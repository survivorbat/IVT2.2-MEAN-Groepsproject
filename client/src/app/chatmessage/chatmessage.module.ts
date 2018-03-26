import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './services/message.service';
import { InputfieldComponent } from './components/inputfield/inputfield.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InputfieldComponent],
  providers: [MessageService]
})
export class ChatmessageModule { }
