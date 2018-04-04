import { Component, OnInit } from '@angular/core';
//Import various services
import { FilmService } from '../../../chatresource/services/film.service';
import Resource from '../../../chatresource/domain/Resource';

import Message from '../../domain/Message';
import ResourceInterface from '../../../chatresource/ResourceInterface';
import { MessageService } from '../../services/message.service';
import Chatbox from '../../../chatbox/domain/Chatbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss']
})
export class InputfieldComponent implements OnInit {
  resources: Resource[];
  message: Message;
  private services: ResourceInterface[];
  private suggestion: string;
  private chatbox: number;
  
  constructor(private filmservice: FilmService, private messageservice: MessageService, private route:ActivatedRoute) {
    this.message=new Message();
    this.services=new Array<ResourceInterface>();
    this.services.push(this.filmservice);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.chatbox=params.chatboxid)
  }
    
  checkMessage() {
    if(this.message.text.startsWith('/film ') && this.message.text.trim().substring(6).length>2){
      this.suggestion="Laden...";
      this.services[0].getItems().subscribe((res: Resource[])=> {
        this.resources=res.filter(item => item.title.toLowerCase().indexOf(this.message.text.substring(6).toLowerCase())>-1 || item.description.toLowerCase().indexOf(this.message.text.substring(6).toLowerCase())>-1);
        if(this.resources.length===0){
          let emptyResource = new Resource();
          emptyResource.title="Niks gevonden...";
          this.resources.push(emptyResource);
        }
      })
    } else {
      this.resources=[];
    }
  }
  submit(){
    this.messageservice.add(this.message,this.chatbox)
    this.message= new Message()
  }
}
