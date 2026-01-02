# Firebase Integration Setup

Your Next.js project has been successfully integrated with Firebase for managing projects, staff, vacancies, and services. Here's what has been added and how to set it up:

## What's Been Added

### Firebase Integration
- **Firebase Configuration**: `lib/firebase.ts` - Firebase app initialization
- **Firebase Services**: `lib/firebase-service.ts` - CRUD operations for all data types
- **Authentication**: `lib/auth-service.ts` - User authentication and management
- **Types**: `lib/types.ts` - TypeScript interfaces for all data models
- **Default Data**: `lib/default-data.ts` - Fallback data when Firebase is empty

### Frontend Components
- **Data Hooks**: `hooks/use-data.ts` - Custom hooks with Firebase/default data fallback
- **Auth Context**: `contexts/auth-context.tsx` - Authentication state management
- **Dashboard Layout**: `components/DashboardLayout.tsx` - Admin panel layout
- **Login Page**: `app/login/page.tsx` - Authentication interface
- **Dashboard**: `app/dashboard/page.tsx` - Main admin dashboard

### Updated Pages
All existing pages now use Firebase data with default fallbacks:
- Projects page and component
- Services page and component
- About page team section (TeamSection component)
- Vacancies page

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and Firestore Database

### 2. Configure Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Email/Password provider
3. Create your admin user in Authentication > Users

### 3. Set up Firestore Database
1. Create Firestore database in production mode
2. Update security rules to allow authenticated users to read/write

### 4. Get Firebase Configuration
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click the web app icon to create a web app
4. Copy the configuration object

### 5. Update Environment Variables
Update your `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 6. Firestore Security Rules
Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write all collections
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to display data
    match /{collection}/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## How It Works

### Data Management
- **Default Data**: If Firebase collections are empty, the app shows default data
- **Firebase Data**: When data exists in Firebase, it takes precedence
- **Fallback Strategy**: If Firebase fails, the app gracefully falls back to default data

### Authentication Flow
1. Visit `/login` to access admin panel
2. Sign in with your Firebase Auth credentials
3. Access `/dashboard` to manage content
4. Sign out to return to public site

### Dashboard Features
- **Projects Management**: CRUD operations for construction projects
- **Services Management**: Manage service offerings
- **Staff Management**: Team member profiles
- **Vacancies Management**: Job postings with active/inactive status

### Public Site Behavior
- Always shows content (Firebase data if available, default data as fallback)
- No authentication required for public pages
- Seamless user experience regardless of Firebase status

## Access Points

- **Public Site**: `/` (home), `/projects`, `/services`, `/about`, `/vacancies`
- **Admin Login**: `/login`
- **Admin Dashboard**: `/dashboard` (requires authentication)
- **Content Management**: `/dashboard/projects`, `/dashboard/services`, etc.

## Default Admin Account
After setting up Firebase Auth, create an admin account through the Firebase Console or update the auth service to include a default admin user.

## Development vs Production
- Environment variables work for both development and production
- Firebase security rules should be properly configured for production use
- Consider implementing role-based access control for multiple admin users

The integration is designed to be robust and user-friendly, ensuring your website always displays content while providing powerful admin capabilities when needed.