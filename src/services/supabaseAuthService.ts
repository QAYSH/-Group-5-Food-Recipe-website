import { createClient, SupabaseClient, User, AuthChangeEvent, Session } from '@supabase/supabase-js';

const supabaseUrl = 'https://ncpqyxmyusyscfgqchyr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jcHF5eG15dXN5c2NmZ3FjaHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Njc2MTAsImV4cCI6MjA2NDE0MzYxMH0.ld0ApKdTJl_M64hGxrAuPk03Jv4yosFSdxFrOvFxWMg';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseAuthService {
  async signUp(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  }

  async signIn(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const supabaseAuthService = new SupabaseAuthService();
