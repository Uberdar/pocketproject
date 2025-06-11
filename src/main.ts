// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser'; // Bootstrap standalone Angular app
import { App } from './app/app'; // Import our main App component
import { environment } from './environments/environment'; // Import Firebase config

// Firebase v11 imports (modular SDK)
import { initializeApp } from 'firebase/app'; // Initialize Firebase app
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Firestore database
import { getStorage } from 'firebase/storage'; // Firebase Storage

// AngularFire v20 providers
import { provideFirebaseApp } from '@angular/fire/app'; // AngularFire app provider
import { provideAuth } from '@angular/fire/auth'; // AngularFire auth provider  
import { provideFirestore } from '@angular/fire/firestore'; // AngularFire Firestore provider
import { provideStorage } from '@angular/fire/storage'; // AngularFire Storage provider

// Angular routing
import { provideRouter } from '@angular/router'; // Router provider
import { routes } from './app/app.routes'; // App routes (we'll create this)

// Bootstrap the Angular application with Firebase providers
bootstrapApplication(App, {
  providers: [
    // Router setup for navigation
    provideRouter(routes),
    
    // Firebase App initialization
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    // Firebase Authentication provider
    provideAuth(() => getAuth()),
    
    // Firestore database provider  
    provideFirestore(() => getFirestore()),
    
    // Firebase Storage provider
    provideStorage(() => getStorage())
  ]
}).catch(err => console.error('Error starting app:', err)); // Error handling