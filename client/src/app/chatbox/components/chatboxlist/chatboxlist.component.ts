import { Component, OnInit } from '@angular/core';
import { ChatboxService } from '../../services/chatbox.service';
import Chatbox from '../../domain/Chatbox';

@Component({
  selector: 'app-chatboxlist',
  templateUrl: './chatboxlist.component.html',
  styleUrls: ['./chatboxlist.component.scss']
})
export class ChatboxlistComponent implements OnInit {

  private chatboxes: Chatbox[];
  private error: string;
  showCreateNew = false;
  newBox: Chatbox = {
    name: 'test',
    description: 'de',
    maxPeople: 0,
    since: null
  };

  constructor(private chatboxService: ChatboxService) { }

  ngOnInit() {
    this.getChatboxes();
  }

  public get Chatboxes(): Chatbox[] {
    return this.chatboxes;
  }

  getChatboxes(): void{
    this.chatboxService.getItems().subscribe(res => this.chatboxes=res, err => this.error="Error bij het ophalen van de chat groepen");
  }
  storeChatbox(): void {
    this.showCreateNew = false;
    this.chatboxService.addItem(this.newBox).subscribe(res => this.getChatboxes(), err => this.error="Error bij het ophalen van de chat groepen");
  }
}
