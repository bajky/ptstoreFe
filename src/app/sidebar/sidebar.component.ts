import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/dashboard/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/dashboard/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/dashboard/table',         title: 'Orders',        icon:'nc-tile-56',    class: '' },
    { path: '/dashboard/products',         title: 'Products',        icon:'nc-cart-simple',    class: '' },
    // { path: '/register',         title: 'Register',        icon:'nc-tile-56',    class: '' },
    // { path: '/login',         title: 'Login',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    assetsPath = environment.assetsPath;
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
