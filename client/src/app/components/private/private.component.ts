import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  showChatlist = false;
  emptyArray = new Array(45);

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.localStorage.getItem('API_TOKEN') === null) {
      this.router.navigateByUrl('/login')
    }
  }

}
