import { Component, OnInit } from '@angular/core'
import { MessageService } from '../../services/message.service'
import Message from '../../domain/Message'
import { ActivatedRoute, Params } from '@angular/router'
import Chatbox from '../../../chatbox/domain/Chatbox'

@Component({
  selector: 'app-chatarea',
  templateUrl: './chatarea.component.html',
  styleUrls: ['./chatarea.component.scss']
})
export class ChatareaComponent implements OnInit {
  chatmessages: Message[]
  private interval
  private loader
  constructor(private chatmessageservice: MessageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      clearInterval(this.interval)
      this.interval = window.setInterval(() => this.getMessages(parseInt(params.chatboxid)),1000)
    })
  }

  getMessages(chatbox: number){
    this.loader = this.chatmessageservice.getMessages(chatbox).subscribe(res => {this.chatmessages=res.reverse()}, err => {})
  }
  deleteMessage(id){
    this.chatmessageservice.remove(id)
  }
}
