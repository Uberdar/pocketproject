// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation';
import { SidebarComponent } from './shared/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationComponent, // Top navigation
    SidebarComponent     // Left sidebar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'pocketproject';
}

// EXPLANATION OF CHANGES:
// 
// 1. Import SidebarComponent:
//    - We import our new SidebarComponent
//    - Add it to the imports array
//
// 2. ViewChild Reference:
//    - Get reference to sidebar component
//    - This allows us to check sidebar state in template
//    - Used for conditional CSS classes on main content
//
// 3. Template Updates:
//    - <app-sidebar> added to template
//    - Main content gets conditional classes based on sidebar state
//    - This allows content to adjust when sidebar expands/collapses