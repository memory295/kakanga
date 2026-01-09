'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AuthService } from '@/lib/supabase-auth';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, displayName: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase env is missing, avoid hanging and render publicly
    if (!isSupabaseConfigured) {
      setUser(null);
      setLoading(false);
      return;
    }

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      if (timeout) clearTimeout(timeout);
    });

    // Fallback: if auth check stalls, stop loading so pages render
    timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      if (timeout) clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
      const user = await AuthService.signIn(email, password);
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<User | null> => {
    try {
      const user = await AuthService.signUp(email, password, displayName);
      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};