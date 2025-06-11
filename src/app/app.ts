import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import our new navigation component
import { NavigationComponent } from './shared/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationComponent  // Add the navigation component to imports
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'pocketproject';
}

// EXPLANATION OF CHANGES:
// 
// 1. Import Statement:
//    - We import our NavigationComponent from the correct path
//    - This tells Angular that we want to use this component
//
// 2. Imports Array:
//    - In Angular v20 standalone components, we list all components we use
//    - NavigationComponent is added so we can use <app-navigation> in HTML
//    - RouterOutlet stays for routing functionality
//
// 3. Why This Approach:
//    - Standalone components are more modern than NgModules
//    - Each component declares exactly what it needs
//    - Better tree-shaking (smaller bundle size)
//    - Easier to understand dependencies