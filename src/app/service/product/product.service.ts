import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrdersLoggedUser() {
    let loggedUser: User = this.authService.userValue;
    let userOrdersLink: string = loggedUser._links.orders.href;
    return this.http.get(userOrdersLink);
  }
}
