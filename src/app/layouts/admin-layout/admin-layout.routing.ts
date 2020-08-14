import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
// import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {LoginComponent} from "../../pages/login/login.component";
import {RegisterComponent} from "../../pages/register/register.component";
import {ProductsComponent} from "../../pages/products/products.component";

export const AdminLayoutRoutes: Routes = [
    {
      path: '',
      component: DashboardComponent
    },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'products',       component: ProductsComponent },
    { path: 'notifications',       component: NotificationsComponent }
];
