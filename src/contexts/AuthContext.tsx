import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseAuthService } from '@/services/supabaseAuthService';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{success: boolean;error?: string;}>;
  signup: (username: string, email: string, password: string) => Promise<{success: boolean;error?: string;}>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const mapSupabaseUserToUser = (supabaseUser: SupabaseUser | null): User | null => {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    username: supabaseUser.user_metadata?.username || supabaseUser.email || '',
    email: supabaseUser.email || '',
    profilePicture: supabaseUser.user_metadata?.profilePicture || undefined,
    createdAt: supabaseUser.created_at || new Date().toISOString(),
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await supabaseAuthService.getCurrentUser();
      setUser(mapSupabaseUserToUser(currentUser));
      setIsLoading(false);
    };

    getUser();

    const { data: authListener } = supabaseAuthService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUserToUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    try {
      const supabaseUser = await supabaseAuthService.signUp(email, password);
      if (!supabaseUser) {
        return { success: false, error: 'Signup failed' };
      }
      // Optionally update user metadata with username and profilePicture here if needed
      setUser(mapSupabaseUserToUser(supabaseUser));
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Signup failed. Please try again.' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const supabaseUser = await supabaseAuthService.signIn(email, password);
      if (!supabaseUser) {
        return { success: false, error: 'Login failed' };
      }
      setUser(mapSupabaseUserToUser(supabaseUser));
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    await supabaseAuthService.signOut();
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    // Note: To persist profile updates, you would update Supabase user metadata here.
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value} data-id="953uopzpo" data-path="src/contexts/AuthContext.tsx">
      {children}
    </AuthContext.Provider>
  );
};
