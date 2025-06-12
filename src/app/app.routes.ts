// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.HomeComponent) },
  
  // Add login route
  { path: 'login', loadComponent: () => import('./components/auth/login/login').then(m => m.LoginComponent) },
  
  { path: '**', redirectTo: '/home' }
];