import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxService } from './services/chatbox.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatboxService]
})
export class ChatboxModule { }
