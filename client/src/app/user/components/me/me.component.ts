import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import User from '../../domain/User';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public error: string;
  public user: User = {
    id: null,
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getMe()
  }

  getMe(): void {
    this.userService.getMe().subscribe(res => this.handleLog(res), err => this.handleError(err.error));
  }

  handleLog(answer): void {
    this.user = answer
  }

  handleError(error): void {
    console.log('token verlopen')
    window.localStorage.removeItem('API_TOKEN')
    this.router.navigateByUrl('/login')
  }

}
