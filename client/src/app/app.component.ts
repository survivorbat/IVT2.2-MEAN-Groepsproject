import { Component } from '@angular/core';
//import { Input } from '../app/chatmessage/components/inputfield/inputfield.component.html';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //templateUrl:  '../app/chatmessage/components/inputfield/inputfield.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  showChatlist = false;
  emptyArray = new Array(45);
}
