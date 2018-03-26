import { Component, OnInit } from '@angular/core';
import Message from '../../domain/Message';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss']
})
export class InputfieldComponent implements OnInit {

  private message: Message;
  
  constructor() { }

  ngOnInit() {
  }

}
