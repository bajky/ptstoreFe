import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AuthService} from "../../service/auth/auth.service";
import {User} from "../../model/User";

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    constructor(private userService: UserService, private authService: AuthService) {
    }
    user: User = new User();
    ngOnInit() {
      let userName = this.authService.userValue.userName;
      this.userService.getUserInfo(userName).subscribe((userData: User) => {
        this.user = userData;
      })
    }
}
