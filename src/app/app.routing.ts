import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AuthGuardService} from "./guard/auth-guard.service";
import {ProductsComponent} from "./pages/products/products.component";
import {LoginGuardService} from "./guard/login-guard.service";

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService]
  }, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuardService]
  }, {
    path: 'products',
    component: ProductsComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
