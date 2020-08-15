import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  isAuthenticated() {
    return localStorage.getItem('user') != null;
  }

  login(userName: string, password: string) {
    let token: string = window.btoa(userName + ':' + password);
      return this.http.get<any>(`${environment.apiUrl}/auth/login`, {headers: {Authorization: `Basic ${token}`}})
      .pipe(map((user: User) => {
        user.token = token;
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateUserInfo(user: User) {
    let previousVal = this.userValue
    user.token = previousVal.token;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
