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
    username: 'asdf',
    password: 'asdf'
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(): void {
    // this.user.username = ' tests tdsf ';
    // this.router.navigateByUrl('/m');
    this.userService.addUser(this.user).subscribe(res => console.log(res), err => this.error="Error bij het ophalen van de chat groepen");
  }

}
