import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { loginGuard } from './guard/login-guard';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Cesca Login',
        loadComponent: () => import('../app/components/login/login').then(m => m.Login),
        canActivate: [loginGuard],
    },
    {
        path: '',
        loadComponent: () => import('../app/components/admin/admin').then(m => m.Admin),
        canActivate: [authGuard],
        children: [
           {
                path: 'dashboard',
                title: 'Cesca Dashboard',
                loadComponent: () => import('../app/components/dashboard/dashboard').then(m => m.Dashboard),
                canActivate: [authGuard]
           },
           {
                path: 'inventory',
                title: 'Cesca Inventory',
                loadComponent: () => import('../app/components/inventory/inventory').then(m => m.Inventory),
                canActivate: [authGuard]
           },
           {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
           }
        ]
    }
];
