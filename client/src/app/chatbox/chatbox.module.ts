import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatboxService } from './services/chatbox.service';
import { ChatboxlistComponent } from './components/chatboxlist/chatboxlist.component'
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [ChatboxlistComponent],
  exports:[ChatboxlistComponent],
  providers: [ChatboxService]
})
export class ChatboxModule { }
