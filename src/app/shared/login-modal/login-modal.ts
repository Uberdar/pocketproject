// src/shared/login-modal/login-modal.ts
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Import Firebase auth service

@Component({
  selector: 'app-login-modal',
  standalone: true, // Make it standalone for Angular v20
  imports: [CommonModule], // For @if directive
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss'
})
export class LoginModal {
  // Inject Firebase auth service using modern Angular v20 syntax
  protected authService = inject(AuthService);
  
  // Output event to notify parent component when modal should close
  @Output() closeModal = new EventEmitter<void>();

  constructor() {
    console.log('LoginModal initialized');
  }

  /**
   * Handle Google sign-in button click
   * Uses Firebase authentication service
   */
  async onGoogleSignIn(): Promise<void> {
    console.log('Google sign-in button clicked in modal');
    
    try {
      // Call Firebase authentication
      await this.authService.signInWithGoogle();
      
      // Close modal after successful login
      this.onClose();
      
    } catch (error) {
      console.error('Login failed in modal:', error);
      // Error handling is done in AuthService
      // Modal stays open so user can see error and try again
    }
  }

  /**
   * Handle modal close (X button, backdrop click, escape key)
   */
  onClose(): void {
    console.log('Closing login modal');
    this.closeModal.emit(); // Notify parent component
  }

  /**
   * Handle backdrop click (click outside modal)
   */
  onBackdropClick(event: Event): void {
    // Only close if clicking the backdrop itself, not modal content
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  /**
   * Handle escape key press
   */
  onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }
}