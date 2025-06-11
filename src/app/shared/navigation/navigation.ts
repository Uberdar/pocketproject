import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation', // This is how we'll use the component in HTML: <app-navigation></app-navigation>
  imports: [], // For standalone components, we import what we need here (empty for now)
  templateUrl: './navigation.html', // Points to our HTML template file
  styleUrl: './navigation.scss' // Points to our SCSS styles file
})
export class NavigationComponent {
  // Component properties and methods go here
  
  // For now, we'll keep it simple with just a title property
  appTitle = 'DNDDB'; // Your D&D database app title
  
  // Method to handle login button click (we'll add functionality later)
  onLoginClick(): void {
    console.log('Login button clicked!'); // For now, just log to console
    // Later we'll add actual login functionality here
  }
}