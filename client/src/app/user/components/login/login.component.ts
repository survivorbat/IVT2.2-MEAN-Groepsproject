import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import User from '../../domain/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error: string;
  public user: User = {
    id: null,
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.userService.checkUser(this.user).subscribe(res => this.handleLog(res), err => this.error=err.error);
  }

  handleLog(answer): void {
    window.localStorage.setItem('API_TOKEN', answer.token)
    this.router.navigateByUrl('/m')
  }

  register(){
    this.router.navigateByUrl('/register')
  }

}
