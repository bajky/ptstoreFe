import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import {ProductsComponent} from "../../pages/products/products.component";
import {ProductDetailComponent} from "../../pages/product-detail/product-detail.component";
import {IconsComponent} from "../../pages/icons/icons.component";

export const AdminLayoutRoutes: Routes = [
    {
      path: '',
      component: DashboardComponent
    },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'products',       component: ProductsComponent },
    { path: 'productdetail',       component: ProductDetailComponent },
    // { path: 'icons',       component: IconsComponent },
    // { path: 'notifications',       component: NotificationsComponent }
];
