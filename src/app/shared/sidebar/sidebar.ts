// src/app/shared/sidebar/sidebar.ts
import { Component, inject, signal, effect, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, // For @if directive
    RouterModule  // For routerLink and routerLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  // Inject services
  protected authService = inject(AuthService);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  
  // Sidebar collapsed state - starts collapsed by default
  private collapsedSignal = signal<boolean>(true);
  
  // Expose readonly signal
  public readonly isCollapsed = this.collapsedSignal.asReadonly();
  
  // localStorage key for remembering user preference
  private readonly SIDEBAR_STORAGE_KEY = 'dnddb-sidebar-collapsed';
  
  constructor() {
    console.log('SidebarComponent initialized');
    
    // Load saved preference from localStorage on component initialization
    this.loadSidebarPreference();
    
    // Update main content margin whenever sidebar state changes
    effect(() => {
      const collapsed = this.collapsedSignal();
      this.saveSidebarPreference(collapsed);
      this.updateMainContentMargin(collapsed);
      console.log('Sidebar state changed:', collapsed ? 'collapsed' : 'expanded');
    });
  }
  
  /**
   * Toggle sidebar collapsed/expanded state
   */
  toggleSidebar(): void {
    console.log('Toggling sidebar');
    this.collapsedSignal.update(collapsed => !collapsed);
  }
  
  /**
   * Update main content margin based on sidebar state
   */
  private updateMainContentMargin(collapsed: boolean): void {
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    if (mainContent) {
      const marginLeft = collapsed ? '60px' : '250px';
      this.renderer.setStyle(mainContent, 'margin-left', marginLeft);
    }
  }
  
  /**
   * Load sidebar preference from localStorage
   * Falls back to collapsed (true) if no preference saved
   */
  private loadSidebarPreference(): void {
    try {
      const saved = localStorage.getItem(this.SIDEBAR_STORAGE_KEY);
      if (saved !== null) {
        const isCollapsed = JSON.parse(saved);
        this.collapsedSignal.set(isCollapsed);
        console.log('Loaded sidebar preference:', isCollapsed ? 'collapsed' : 'expanded');
      } else {
        console.log('No saved sidebar preference, defaulting to collapsed');
      }
    } catch (error) {
      console.warn('Failed to load sidebar preference from localStorage:', error);
      // Keep default collapsed state on error
    }
  }
  
  /**
   * Save sidebar preference to localStorage
   * This is non-sensitive UI state, safe to store locally
   */
  private saveSidebarPreference(collapsed: boolean): void {
    try {
      localStorage.setItem(this.SIDEBAR_STORAGE_KEY, JSON.stringify(collapsed));
    } catch (error) {
      console.warn('Failed to save sidebar preference to localStorage:', error);
      // Continue without saving - not critical functionality
    }
  }
  
  /**
   * Handle sidebar item click
   * Could be used for analytics or additional functionality later
   */
  onSidebarItemClick(item: string): void {
    console.log('Sidebar item clicked:', item);
  }
}