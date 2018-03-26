import { Component, OnInit } from '@angular/core';
//Import various services
import { FilmService } from '../../../chatresource/services/film.service';
import Resource from '../../../chatresource/domain/Resource';

import Message from '../../domain/Message';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss']
})
export class InputfieldComponent implements OnInit {
  private resources: Resource[];
  private message: Message;
  
  constructor(private filmservice: FilmService) { }

  ngOnInit() {

  }
    
  checkMessage() {
      //check message on filmService
    this.filmservice.getItems().subscribe(res=> {
        console.log("cheese");
      //this.resources=res.map(item=> {
      //    console.log("cheese");
      //})
    })
  }

}
