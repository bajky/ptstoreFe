import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {User} from "../../model/User";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrdersLoggedUser(page: number, size: number): Observable<any> {
    let loggedUser: User = this.authService.userValue;
    let userLink: string = loggedUser._links.self.href;

    let params = new HttpParams()
      .append('page', String(page))
      .append('size', String(size))
      .append('user', userLink);

    return this.http.get(`${environment.apiUrl}/api/orders/search/byUser`, {params: params});
  }

  createOrder(products: string[]) {
    let loggedUser: User = this.authService.userValue;
    let userLink: string = loggedUser._links.self.href;

    let order = {
      user: userLink,
      time: new Date(),
      products: products
    }

    let headers = new HttpHeaders()
      .append('Content-Type', 'application/hal+json')

    return this.http.post(`${environment.apiUrl}/api/orders/`, order, {headers: headers});
  }
}
