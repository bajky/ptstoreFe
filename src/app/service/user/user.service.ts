import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserInfo() {
    return this.http.get(this.authService.userValue._links.self.href);
  }

  registerUser(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  updateUser(user: User) {
    return this.http.patch(this.authService.userValue._links.self.href, user);
  }
}
