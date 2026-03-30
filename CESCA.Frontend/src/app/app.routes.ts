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
                canActivate: [authGuard],
                children: [
                    {
                         path: 'orders-over-time-chart',
                         title: 'Cesca ~ Orders Over Time Chart',
                         loadComponent: () => import('../app/components/dashboard/charts/orders-over-time-chart/orders-over-time-chart').then(m => m.OrdersOverTimeChart)
                    }
                ]
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
                path: 'invoice',
                title: 'Cesca ~ Invoice',
                loadComponent: () => import('../app/components/invoice/invoice').then(m => m.Invoice),
                canActivate: [authGuard],
                children: [
                    {
                         path: 'invoice-order-item',
                         title: 'Cesca - Invoice Order Item',
                         loadComponent: () => import('../app/components/invoice-order-items/invoice-order-items').then(m => m.InvoiceOrderItems),
                         canActivate: [authGuard]
                    },
                ]
           },
          {
          path : 'pos',
          title: 'Cesca ~ Point of Sale',
          loadComponent: () => import('../app/components/point-of-sale/point-of-sale').then(m => m.PointOfSale),
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
     path: 'unauthorized',
     title: 'Unauthorized',
     loadComponent: () => import('../app/components/unathorized/unathorized').then(m => m.Unathorized)
    },
    {
        path: '**',
        redirectTo: ''        
    }
];
