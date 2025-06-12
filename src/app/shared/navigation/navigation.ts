// src/shared/navigation/navigation.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // For @if directive
import { RouterModule } from '@angular/router'; // For routerLink
import { AuthService } from '../../services/auth'; // Our Firebase auth service
import { LoginModal } from '../login-modal/login-modal'; // Keep your existing modal

@Component({
  selector: 'app-navigation',
  standalone: true, // Make it standalone for Angular v20
  imports: [
    CommonModule, // For @if, @for directives
    RouterModule, // For navigation links
    LoginModal    // Keep your existing login modal
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent {
  // Inject Firebase auth service using modern Angular v20 syntax
  protected authService = inject(AuthService);
  
  // Component properties
  appTitle = 'DNDDB'; // Keep your existing title
  
  // Modal visibility state (keep your existing modal system)
  isLoginModalOpen = false;
  
  constructor() {
    console.log('NavigationComponent initialized');
  }
  
  // Method to handle login button click (updated for auth integration)
  onLoginClick(): void {
    console.log('Login button clicked!');
    
    // Option 1: Use your existing modal system
    this.isLoginModalOpen = true;
    
    // Option 2: Or navigate directly to login page
    // You can choose which approach you prefer
    // this.router.navigate(['/login']);
  }
  
  // Method to handle modal close (keep existing)
  onCloseModal(): void {
    console.log('Modal closed');
    this.isLoginModalOpen = false;
  }
  
  // New method to handle sign out
  async onSignOut(): Promise<void> {
    console.log('Sign-out button clicked');
    await this.authService.signOut();
  }
  
  // Method to navigate to login page (alternative to modal)
  navigateToLogin(): void {
    // If you want to use the separate login page instead of modal
    // this.router.navigate(['/login']);
  }
}