import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';

const appRoute: Routes = [
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);
