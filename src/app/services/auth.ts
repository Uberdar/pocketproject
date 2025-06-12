// src/app/services/auth.service.ts
import { Injectable, inject, signal, computed } from '@angular/core'; // Angular v20 signals
import { Router } from '@angular/router'; // Navigation after login/logout

// Firebase v11 Authentication imports
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

// Firebase v11 Firestore imports  
import { Firestore, doc, setDoc, getDoc, serverTimestamp } from '@angular/fire/firestore';

// Define user profile interface for TypeScript safety
export interface UserProfile {
  uid: string; // Firebase user ID
  email: string; // User email from Google
  displayName: string; // User name from Google
  photoURL: string; // User avatar from Google
  createdAt: any; // Firestore server timestamp
  lastLoginAt: any; // Firestore server timestamp
  preferences: {
    theme: 'light' | 'dark'; // UI theme preference
    sidebarCollapsed: boolean; // Navigation state
  };
}

@Injectable({
  providedIn: 'root' // Singleton service available app-wide
})
export class AuthService {
  // Inject Firebase services using modern Angular v20 inject function
  private auth = inject(Auth); // Firebase Authentication
  private firestore = inject(Firestore); // Firestore database
  private router = inject(Router); // Angular router for navigation

  // Signals for reactive state management (Angular v20 feature)
  private userSignal = signal<User | null>(null); // Current Firebase user
  private loadingSignal = signal<boolean>(false); // Loading state for UI actions (login/logout)
  private errorSignal = signal<string | null>(null); // Error messages
  
  // NEW: Auth initialization tracking signal
  private authInitializedSignal = signal<boolean>(false); // Has Firebase finished checking auth state?

  // Computed signals (derived state) - automatically update when dependencies change
  public readonly user = this.userSignal.asReadonly(); // Expose user as readonly
  public readonly isLoading = this.loadingSignal.asReadonly(); // Expose loading state for actions
  public readonly error = this.errorSignal.asReadonly(); // Expose error state
  
  // NEW: Expose auth initialization state
  public readonly isAuthReady = this.authInitializedSignal.asReadonly(); // Has Firebase finished checking?
  
  // Computed signal to check if user is authenticated
  public readonly isAuthenticated = computed(() => !!this.userSignal()); // Returns true if user exists
  
  // Computed signal to get user display info safely
  public readonly userDisplayInfo = computed(() => {
    const user = this.userSignal();
    if (!user) return null;
    
    return {
      name: user.displayName || 'User', // Fallback if no display name
      email: user.email || '', // User email
      avatar: user.photoURL || '', // Profile picture
      uid: user.uid // Unique identifier
    };
  });

  constructor() {
    console.log('AuthService initialized'); // Debug log
    this.initAuthStateListener(); // Start listening to auth changes
  }

  /**
   * Initialize Firebase Auth State Listener
   * Automatically updates user signal when auth state changes
   * NEW: Now tracks when Firebase has finished its initial auth check
   */
  private initAuthStateListener(): void {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
      
      // Update user state
      this.userSignal.set(user); // Set current user (null if not logged in)
      this.errorSignal.set(null); // Clear any previous errors
      
      // NEW: Mark auth as initialized on first callback
      // This happens once Firebase has finished checking for existing auth
      if (!this.authInitializedSignal()) {
        console.log('Firebase Auth initialization complete');
        this.authInitializedSignal.set(true); // Auth check is done!
      }
    });
  }

  /**
   * Sign in with Google OAuth
   * Creates popup window for Google authentication
   */
  async signInWithGoogle(): Promise<void> {
    try {
      this.loadingSignal.set(true); // Start loading (for button states)
      this.errorSignal.set(null); // Clear previous errors

      // Create Google Auth Provider
      const provider = new GoogleAuthProvider();
      
      // Configure OAuth scopes (what permissions we request)
      provider.addScope('profile'); // Access to user profile
      provider.addScope('email'); // Access to user email
      
      // Show Google sign-in popup
      const result = await signInWithPopup(this.auth, provider);
      
      // Extract user information
      const user = result.user;
      console.log('Google sign-in successful:', user.displayName);

      // Create or update user profile in Firestore
      await this.createOrUpdateUserProfile(user);

      // Navigate to home page after successful login
      await this.router.navigate(['/home']);

    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle different types of errors
      if (error.code === 'auth/popup-closed-by-user') {
        this.errorSignal.set('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        this.errorSignal.set('Popup blocked. Please allow popups and try again.');
      } else {
        this.errorSignal.set('Sign-in failed. Please try again.');
      }
    } finally {
      this.loadingSignal.set(false); // Stop loading
    }
  }

  /**
   * Sign out the current user
   * Clears user data and redirects to home
   */
  async signOut(): Promise<void> {
    try {
      this.loadingSignal.set(true); // Start loading
      
      await signOut(this.auth); // Firebase sign out
      
      console.log('User signed out successfully');
      
      // Navigate to home page after logout
      await this.router.navigate(['/home']);
      
    } catch (error: any) {
      console.error('Sign-out error:', error);
      this.errorSignal.set('Sign-out failed. Please try again.');
    } finally {
      this.loadingSignal.set(false); // Stop loading
    }
  }

  /**
   * Create or update user profile in Firestore
   * Called after successful Google authentication
   */
  private async createOrUpdateUserProfile(user: User): Promise<void> {
    try {
      // Reference to user document in Firestore
      const userDocRef = doc(this.firestore, 'users', user.uid);
      
      // Check if user document already exists
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        // User exists - update last login time
        await setDoc(userDocRef, {
          lastLoginAt: serverTimestamp() // Server timestamp for consistency
        }, { merge: true }); // Merge with existing data
        
        console.log('User profile updated with last login');
      } else {
        // New user - create complete profile
        const newUserProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'User',
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          preferences: {
            theme: 'light', // Default theme
            sidebarCollapsed: false // Default sidebar state
          }
        };

        await setDoc(userDocRef, newUserProfile);
        console.log('New user profile created in Firestore');
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      // Don't throw error - authentication was successful even if profile creation failed
    }
  }

  /**
   * Clear error messages
   * Useful for UI error handling
   */
  clearError(): void {
    this.errorSignal.set(null);
  }

  /**
   * Get current user profile from Firestore
   * Returns extended user data beyond Firebase Auth
   */
  async getUserProfile(): Promise<UserProfile | null> {
    const user = this.userSignal();
    if (!user) return null;

    try {
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        return userDocSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
}