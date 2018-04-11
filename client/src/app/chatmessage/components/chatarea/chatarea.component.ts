import { Component, OnInit } from '@angular/core'
import { MessageService } from '../../services/message.service'
import { ChatresourceService } from '../../../chatresource/services/chatresource.service'
import Message from '../../domain/Message'
import { ActivatedRoute, Params } from '@angular/router'
import Chatbox from '../../../chatbox/domain/Chatbox'
import * as moment from 'moment';
import 'moment/locale/nl';


@Component({
  selector: 'app-chatarea',
  templateUrl: './chatarea.component.html',
  styleUrls: ['./chatarea.component.scss']
})
export class ChatareaComponent implements OnInit {
  chatmessages: Message[]
  private resources;
  private interval
  private loader
  constructor(private chatmessageservice: MessageService, private chatresourceservice: ChatresourceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      clearInterval(this.interval)
      this.interval = window.setInterval(() => this.getMessages(parseInt(params.chatboxid)),1000)
    })
  }

  getMessages(chatbox: number){
    this.loader = this.chatmessageservice.getMessages(chatbox).subscribe(res => {this.chatmessages=res.reverse()}, err => {})
    this.getResources()
  }
  deleteMessage(id){
    this.chatmessageservice.remove(id)
  }
  timeAgo(time) {
    return moment(time).fromNow()
  }

  getResource(id) {
    return JSON.stringify(this.resources.find(x => x.id === id));
  }

  getResources(): void{
    this.chatresourceservice.getItems().subscribe(res => this.resources=res)
  }
}
