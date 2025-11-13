import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { loginGuard } from './guard/login-guard';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Cesca ~ Login',
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
                title: 'Cesca ~ Dashboard',
                loadComponent: () => import('../app/components/dashboard/dashboard').then(m => m.Dashboard),
                canActivate: [authGuard]
           },
           {
                path: 'inventory',
                title: 'Cesca ~ Inventory',
                loadComponent: () => import('../app/components/inventory/inventory').then(m => m.Inventory),
                canActivate: [authGuard]
           },
           {
                path: 'account-manager',
                title: 'Cesca ~ Account Manager',
                loadComponent: () => import('../app/components/account-manager/account-manager').then(m => m.AccountManager),
                canActivate: [authGuard],
               data: { role: 'Admin' }
           },
           {
                path: 'supplier',
                title: 'Cesca ~ Supplier',
                loadComponent: () => import('../app/components/supplier/supplier').then(m => m.Supplier),
                canActivate: [authGuard]
           },
           {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
           }
        ]
    },
    {
     path: 'unathourized',
     title: 'Unauthorized',
     loadComponent: () => import('../app/components/unathorized/unathorized').then(m => m.Unathorized)
    },
    {
        path: '**',
        redirectTo: ''        
    }
];
