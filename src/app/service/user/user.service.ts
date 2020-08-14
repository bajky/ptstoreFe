import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(userName: String) {
    return this.http.get(`${environment.apiUrl}/api/users/search/findByUserName?userName=${userName}`)
  }

  registerUser(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user)
  }
}
