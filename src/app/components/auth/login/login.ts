// src/app/components/auth/login/login.component.ts
import { Component, inject } from '@angular/core'; // Angular v20 core
import { CommonModule } from '@angular/common'; // Common directives
import { AuthService } from '../../../services/auth'; // Our authentication service

@Component({
  selector: 'app-login', // HTML tag to use this component
  standalone: true, // Modern Angular v20 standalone component
  imports: [
    CommonModule // Provides @if, @for, @switch directives
  ],
  templateUrl: './login.html', // HTML template file
  styleUrl: './login.scss' // SCSS styles file
})
export class LoginComponent {
  // Inject authentication service using modern Angular v20 syntax
  protected authService = inject(AuthService); // Protected - accessible in template

  constructor() {
    console.log('LoginComponent initialized'); // Debug log
  }

  /**
   * Handle Google sign-in button click
   * Calls authentication service method
   */
  async onGoogleSignIn(): Promise<void> {
    console.log('Google sign-in button clicked');
    await this.authService.signInWithGoogle(); // Call our auth service
  }

  /**
   * Clear any error messages
   * Useful when user dismisses error alerts
   */
  onClearError(): void {
    this.authService.clearError(); // Clear error from auth service
  }
}