import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import User from '../../domain/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public error: string;
  public user: User = {
    id: null,
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(): void {
    this.userService.addUser(this.user).subscribe(res => this.router.navigateByUrl('/login'), err => this.error=err.error);
  }

}
