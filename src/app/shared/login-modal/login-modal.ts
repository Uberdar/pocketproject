import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  imports: [],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss'
})
export class LoginModal {
  // Event emitter to close the modal
  @Output() closeModal = new EventEmitter<void>();

  // Handle escape key press globally
  @HostListener('document:keydown', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal.emit();
    }
  }

  // Handle click outside modal (on backdrop)
  onBackdropClick(): void {
    this.closeModal.emit();
  }

  // Handle close button click
  onCloseClick(): void {
    this.closeModal.emit();
  }

  // Handle Google login button click (placeholder for now)
  onGoogleLogin(): void {
    console.log('Google login clicked!');
    // TODO: Implement Google authentication in next session
  }

  // Prevent modal content clicks from closing the modal
  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }
}