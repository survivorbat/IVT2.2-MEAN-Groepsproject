import { Component, OnInit } from '@angular/core'
//Import various services
import { FilmService } from '../../../chatresource/services/film.service'
import Resource from '../../../chatresource/domain/Resource'

import Message from '../../domain/Message'
import ResourceInterface from '../../../chatresource/ResourceInterface'
import { MessageService } from '../../services/message.service'
import Chatbox from '../../../chatbox/domain/Chatbox'
import { ActivatedRoute } from '@angular/router'
import ResourceCommand from '../../../chatresource/domain/ResourceCommand'
import { PokemonService } from '../../../chatresource/services/pokemon.service'
import { ChatresourceService } from '../../../chatresource/services/chatresource.service'

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss']
})
export class InputfieldComponent implements OnInit {
  resources: Resource[]
  message: Message
  private services: ResourceCommand[]
  private suggestion: string
  private chatbox: number
  private selectedResource: Resource
  
  constructor(private filmservice: FilmService, private messageservice: MessageService, private route:ActivatedRoute, private pokemonservice: PokemonService, private resourcservice: ChatresourceService) {
    this.message=new Message()
    this.services=new Array<ResourceCommand>()
    this.services.push(new ResourceCommand('/film', this.filmservice))
    this.services.push(new ResourceCommand('/pokemon', this.pokemonservice))
    this.selectedResource=null
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.chatbox=params.chatboxid)
  }
    
  checkMessage() {
    if(this.message.text.startsWith('/')){
      let counter=0
      this.services.filter(servicecommand => this.message.text.indexOf(servicecommand.command)!==-1).forEach(command => {
        counter++
        this.suggestion="Laden..."
        command.resourceinterface.getItems().subscribe((res: Resource[])=> {
          this.resources=res.filter(item => item.title.toLowerCase().indexOf(this.message.text.substring(command.command.length).trim().toLowerCase())>-1 || item.description.toLowerCase().indexOf(this.message.text.substring(command.command.length).trim().toLowerCase())>-1)
          if(this.resources.length===0){
            let emptyResource = new Resource()
            emptyResource.title="Niks gevonden..."
            this.resources.push(emptyResource)
            this.selectedResource=null
          }
        })
      })
      if(counter===0){
        this.resources=[]
      }
    } else {
      this.resources=[]
    }
  }
  selectResource(index){
    this.selectedResource=this.resources[index]
    this.message.text=""
  }
  submit(){
    if(this.selectedResource!==undefined && this.selectedResource!==null){
      this.messageservice.add(this.message,this.chatbox).subscribe((res: any) => {
        this.submitResource(this.selectedResource, res[0].id)
      })
    } else {
      this.messageservice.add(this.message,this.chatbox).subscribe(res => console.log(res))
    }
    this.message.text=""
  }
  private submitResource(resource: Resource, messageid: number){
    resource.message=messageid
    this.resourcservice.addItem(resource)
    this.selectedResource=null
  }
}
