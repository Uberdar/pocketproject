// src/app/components/home/home.component.ts
import { Component } from '@angular/core'; // Angular core component decorator
import { CommonModule } from '@angular/common'; // Common Angular directives

// Standalone component - no NgModule needed!
@Component({
  selector: 'app-home', // HTML tag to use this component
  standalone: true, // Modern Angular v20 standalone component
  imports: [
    CommonModule // Provides @if, @for, @switch directives
  ],
  templateUrl: './home.html', // HTML template file
  styleUrl: './home.scss' // SCSS styles file
})
export class HomeComponent {
  // Component properties
  protected title = 'Welcome to DnDDB'; // Protected - accessible in template
  protected isLoading = false; // Will be used for loading states later
  
  // Constructor - runs when component is created
  constructor() {
    console.log('HomeComponent initialized'); // Debug log
  }
}