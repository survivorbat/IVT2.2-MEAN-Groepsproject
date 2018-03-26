import { Component, OnInit } from '@angular/core';
import { ChatboxService } from '../../services/chatbox.service';
import Chatbox from '../../domain/Chatbox';

@Component({
  selector: 'app-chatboxlist',
  templateUrl: './chatboxlist.component.html',
  styleUrls: ['./chatboxlist.component.scss']
})
export class ChatboxlistComponent implements OnInit {

  constructor(private chatboxService: ChatboxService) { }

  ngOnInit() {
  }
}
