// src/app/app.routes.ts
import { Routes } from '@angular/router'; // Angular routing types

// Define application routes
export const routes: Routes = [
  // Default route - redirect to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Home route (we'll create this component later)
  { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.HomeComponent) },
  
  // Wildcard route - handle 404 errors
  { path: '**', redirectTo: '/home' }
];