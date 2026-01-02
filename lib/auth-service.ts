import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from './types';

export class AuthService {
  static async signIn(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Try to get additional user data from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Update last login
          try {
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              ...userData,
              lastLogin: new Date(),
            }, { merge: true });
          } catch (firestoreError) {
            console.warn('Could not update last login:', firestoreError);
          }
          
          return {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || userData.displayName,
            role: userData.role || 'admin',
            createdAt: userData.createdAt?.toDate() || new Date(),
            lastLogin: new Date(),
          };
        }
      } catch (firestoreError) {
        console.warn('Firestore unavailable, using basic auth:', firestoreError);
      }
      
      // If Firestore is unavailable, create a basic user object
      const basicUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
        role: 'admin', // Default to admin for now
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      // Try to create user document in Firestore, but don't fail if it doesn't work
      try {
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          email: basicUser.email,
          displayName: basicUser.displayName,
          role: basicUser.role,
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      } catch (firestoreError) {
        console.warn('Could not create user document:', firestoreError);
      }
      
      return basicUser;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  static async signUp(email: string, password: string, displayName: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update the user's display name
      await updateProfile(firebaseUser, { displayName });
      
      // Create user document in Firestore
      const newUser: Partial<User> = {
        email: firebaseUser.email!,
        displayName,
        role: 'editor', // Default role
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      
      return {
        id: firebaseUser.uid,
        ...newUser,
      } as User;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || userData.displayName,
              role: userData.role || 'editor',
              createdAt: userData.createdAt?.toDate() || new Date(),
              lastLogin: userData.lastLogin?.toDate(),
            };
            callback(user);
          } else {
            // Create user document if it doesn't exist
            const newUser: Partial<User> = {
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || '',
              role: 'editor',
              createdAt: new Date(),
              lastLogin: new Date(),
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            
            callback({
              id: firebaseUser.uid,
              ...newUser,
            } as User);
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  static async updateUserRole(userId: string, role: 'admin' | 'editor'): Promise<boolean> {
    try {
      await setDoc(doc(db, 'users', userId), { role }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  }
}