import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user: User = {
    userName: ''
  }
  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.user.userName, this.user.password)
      .subscribe(() => {
          this.router.navigate(['dashboard']);
      });
  }
}
