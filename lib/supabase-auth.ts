import { supabase } from './supabase';
import { User } from './types';

export class AuthService {
  static async signIn(email: string, password: string): Promise<User | null> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) return null;

      // Try to get additional user data from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError && userError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.warn('Could not fetch user data:', userError);
      }

      // Update last login if user data exists
      if (userData) {
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() } as any)
          .eq('id', authData.user.id);
      }

      return {
        id: authData.user.id,
        email: authData.user.email!,
        displayName: authData.user.user_metadata?.displayName || (userData as any)?.display_name || null,
        role: (userData as any)?.role || 'admin',
        createdAt: (userData as any)?.created_at ? new Date((userData as any).created_at) : new Date(),
        lastLogin: new Date(),
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return null;
    }
  }

  static async signUp(
    email: string, 
    password: string, 
    displayName?: string
  ): Promise<User | null> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName: displayName || '',
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) return null;

      // Create user profile in the users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email!,
            display_name: displayName || null,
            role: 'admin',
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
          }
        ] as any);

      if (profileError) {
        console.warn('Could not create user profile:', profileError);
      }

      return {
        id: authData.user.id,
        email: authData.user.email!,
        displayName: displayName || null,
        role: 'admin',
        createdAt: new Date(),
        lastLogin: new Date(),
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return null;
    }
  }

  static async signOut(): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) return null;

      // Get additional user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.warn('Could not fetch user data:', userError);
      }

      return {
        id: user.id,
        email: user.email!,
        displayName: user.user_metadata?.displayName || (userData as any)?.display_name || null,
        role: (userData as any)?.role || 'admin',
        createdAt: (userData as any)?.created_at ? new Date((userData as any).created_at) : new Date(),
        lastLogin: (userData as any)?.last_login ? new Date((userData as any).last_login) : undefined,
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Get additional user data
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            displayName: session.user.user_metadata?.displayName || (userData as any)?.display_name || null,
            role: (userData as any)?.role || 'admin',
            createdAt: (userData as any)?.created_at ? new Date((userData as any).created_at) : new Date(),
            lastLogin: (userData as any)?.last_login ? new Date((userData as any).last_login) : undefined,
          };
          callback(user);
        } else {
          callback(null);
        }
      }
    );

    // Also check initial session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: userData }) => {
            const user: User = {
              id: session.user.id,
              email: session.user.email!,
              displayName: session.user.user_metadata?.displayName || (userData as any)?.display_name || null,
              role: (userData as any)?.role || 'admin',
              createdAt: (userData as any)?.created_at ? new Date((userData as any).created_at) : new Date(),
              lastLogin: (userData as any)?.last_login ? new Date((userData as any).last_login) : undefined,
            };
            callback(user);
          });
      } else {
        callback(null);
      }
    });

    return () => subscription.unsubscribe();
  }

  static async updateProfile(userId: string, data: {
    displayName?: string;
    role?: 'admin' | 'editor';
  }): Promise<boolean> {
    try {
      // Update auth metadata if displayName is provided
      if (data.displayName !== undefined) {
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            displayName: data.displayName,
          }
        });
        
        if (authError) throw authError;
      }

      // Update user profile in the users table
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };
      
      if (data.displayName !== undefined) {
        updateData.display_name = data.displayName;
      }
      
      if (data.role !== undefined) {
        updateData.role = data.role;
      }

      const { error: profileError } = await supabase
        .from('users')
        .update(updateData as any)
        .eq('id', userId);

      if (profileError) throw profileError;

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  }

  static async resetPassword(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }

  static async updatePassword(newPassword: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Update password error:', error);
      return false;
    }
  }
}