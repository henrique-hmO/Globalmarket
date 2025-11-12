import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  plan: 'free' | 'start' | 'growth' | 'pro';
  strategies_used: number;
  clone_uses: number;
  scale_uses: number;
  created_at: string;
  trial_used: boolean;
  trial_ip?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  created_at: string;
  created_by: string;
}

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email,
        role: email === 'henriquemoraesh@gmail.com' ? 'admin' : 'user',
        plan: 'free',
        strategies_used: 0,
        clone_uses: 0,
        scale_uses: 0,
        trial_used: false,
      });
    
    if (profileError) throw profileError;
  }
  
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return profile as User;
};

// Usage tracking
export const trackUsage = async (userId: string, type: 'strategy' | 'clone' | 'scale') => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not found');
  
  const field = type === 'strategy' ? 'strategies_used' : 
                type === 'clone' ? 'clone_uses' : 'scale_uses';
  
  const { error } = await supabase
    .from('users')
    .update({ [field]: user[field] + 1 })
    .eq('id', userId);
  
  if (error) throw error;
};

// Check limits
export const checkLimits = async (userId: string, type: 'strategy' | 'clone' | 'scale'): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // Admin and developer have unlimited access
  if (user.email === 'henriquemoraesh@gmail.com' || user.role === 'admin') {
    return true;
  }
  
  // Pro plan has unlimited access
  if (user.plan === 'pro') {
    return true;
  }
  
  // Check limits based on plan
  if (type === 'strategy') {
    if (user.plan === 'start' && user.strategies_used >= 5) return false;
    if (user.plan === 'growth' && user.strategies_used >= 10) return false;
  }
  
  if (type === 'clone' || type === 'scale') {
    if (user.plan === 'free' || user.plan === 'start') return false;
    if (user.plan === 'growth' && user.clone_uses >= 10) return false;
  }
  
  return true;
};

// Trial check
export const checkTrialAvailable = async (ip: string): Promise<boolean> => {
  const { data } = await supabase
    .from('users')
    .select('trial_ip')
    .eq('trial_ip', ip)
    .single();
  
  return !data;
};

export const markTrialUsed = async (userId: string, ip: string) => {
  const { error } = await supabase
    .from('users')
    .update({ trial_used: true, trial_ip: ip })
    .eq('id', userId);
  
  if (error) throw error;
};
