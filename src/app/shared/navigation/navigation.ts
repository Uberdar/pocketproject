import { Component } from '@angular/core';
import { LoginModal } from '../login-modal/login-modal';

@Component({
  selector: 'app-navigation',
  imports: [LoginModal], // Import the LoginModal component
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent {
  // Component properties
  appTitle = 'DNDDB';
  
  // Modal visibility state
  isLoginModalOpen = false;
  
  // Method to handle login button click
  onLoginClick(): void {
    console.log('Login button clicked!');
    this.isLoginModalOpen = true; // Show the modal
  }
  
  // Method to handle modal close
  onCloseModal(): void {
    console.log('Modal closed');
    this.isLoginModalOpen = false; // Hide the modal
  }
}