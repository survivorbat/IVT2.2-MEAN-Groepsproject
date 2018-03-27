import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  showChatlist = false;
  emptyArray = new Array(45);

  constructor() { }

  ngOnInit() {
  }

}
