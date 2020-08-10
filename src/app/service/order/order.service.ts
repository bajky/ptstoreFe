import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

    console.log(params);

    console.log(`${environment.apiUrl}/api/orders/search/byUser`);
    return this.http.get(`${environment.apiUrl}/api/orders/search/byUser`, {params: params});
  }
}
