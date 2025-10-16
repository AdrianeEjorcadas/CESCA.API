import { Routes } from '@angular/router';

export const routes: Routes = [
    
    {
        path: 'login',
        title: 'Cesca Login',
        loadComponent: () => import('../app/components/login/login').then(m => m.Login)
    },
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
