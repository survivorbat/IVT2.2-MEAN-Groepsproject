import { Component, OnInit } from '@angular/core';
//Import various services
import { FilmService } from '../../../chatresource/services/film.service';
import Resource from '../../../chatresource/domain/Resource';

import Message from '../../domain/Message';
import ResourceInterface from '../../../chatresource/ResourceInterface';
import { MessageService } from '../../services/message.service';
import Chatbox from '../../../chatbox/domain/Chatbox';

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
  
  constructor(private filmservice: FilmService, private messageservice: MessageService) {
    this.message=new Message();
    this.services=new Array<ResourceInterface>();
    this.services.push(this.filmservice);
  }

  ngOnInit() {
    
  }
    
  checkMessage() {
    if(this.message.message.startsWith('/film ') && this.message.message.trim().substring(6).length>2){
      this.suggestion="Laden...";
      this.services[0].getItems().subscribe((res: Resource[])=> {
        this.resources=res.filter(item => item.title.toLowerCase().indexOf(this.message.message.substring(6).toLowerCase())>-1 || item.description.toLowerCase().indexOf(this.message.message.substring(6).toLowerCase())>-1);
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
    this.messageservice.add(this.message,new Chatbox)
  }
  loadMessages(){
    this.messageservice.getMessages(new Chatbox())
  }
}
