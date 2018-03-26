import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxService } from './services/chatbox.service';
import { ChatboxlistComponent } from './components/chatboxlist/chatboxlist.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatboxlistComponent],
  exports:[ChatboxlistComponent],
  providers: [ChatboxService]
})
export class ChatboxModule { }
