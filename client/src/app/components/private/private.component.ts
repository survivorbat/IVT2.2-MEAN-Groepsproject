import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  showChatlist = false;
  emptyArray = new Array(45);

  constructor() { }

  ngOnInit() {
  }

}
