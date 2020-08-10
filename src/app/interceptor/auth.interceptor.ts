import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth/auth.service";
import {User} from "../model/User";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    const user: User = this.authService.userValue;
    const isLoggedIn = user && user.token;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${user.token}`
        }
      });
    }

    return next.handle(request);
  }
}
