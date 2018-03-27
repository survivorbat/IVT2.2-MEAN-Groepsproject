import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.localStorage.getItem('API_TOKEN') !== null) {
      this.router.navigateByUrl('/m')
    }
  }

}
