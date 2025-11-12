import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
  id: string;
  email: string;
  plan: 'free' | 'start' | 'growth' | 'pro' | 'lifetime';
  strategies_used: number;
  strategies_limit: number;
  clone_uses: number;
  clone_limit: number;
  scale_uses: number;
  scale_limit: number;
  trial_used: boolean;
  created_at: string;
  subscription_status: 'active' | 'canceled' | 'expired';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}

export interface TrialAccess {
  id: string;
  ip_address: string;
  product_accessed: string;
  accessed_at: string;
}

// Check if email has lifetime access
export const hasLifetimeAccess = (email: string): boolean => {
  return email === 'henriquemoraesh@gmail.com';
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

// Check trial access by IP
export const checkTrialAccess = async (ipAddress: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('trial_access')
    .select('*')
    .eq('ip_address', ipAddress)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking trial access:', error);
    return false;
  }

  return !!data;
};

// Register trial access
export const registerTrialAccess = async (ipAddress: string, productId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('trial_access')
    .insert({
      ip_address: ipAddress,
      product_accessed: productId,
      accessed_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error registering trial access:', error);
    return false;
  }

  return true;
};

// Update user usage
export const updateUserUsage = async (
  userId: string,
  type: 'strategy' | 'clone' | 'scale'
): Promise<boolean> => {
  const profile = await getUserProfile(userId);
  if (!profile) return false;

  const updates: any = {};

  switch (type) {
    case 'strategy':
      if (profile.strategies_used >= profile.strategies_limit && profile.plan !== 'pro' && profile.plan !== 'lifetime') {
        return false;
      }
      updates.strategies_used = profile.strategies_used + 1;
      break;
    case 'clone':
      if (profile.clone_uses >= profile.clone_limit && profile.plan !== 'pro' && profile.plan !== 'lifetime') {
        return false;
      }
      updates.clone_uses = profile.clone_uses + 1;
      break;
    case 'scale':
      if (profile.scale_uses >= profile.scale_limit && profile.plan !== 'pro' && profile.plan !== 'lifetime') {
        return false;
      }
      updates.scale_uses = profile.scale_uses + 1;
      break;
  }

  const { error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating user usage:', error);
    return false;
  }

  return true;
};

// Get plan limits
export const getPlanLimits = (plan: string) => {
  switch (plan) {
    case 'start':
      return {
        strategies_limit: 5,
        clone_limit: 0,
        scale_limit: 0
      };
    case 'growth':
      return {
        strategies_limit: 10,
        clone_limit: 10,
        scale_limit: 10
      };
    case 'pro':
    case 'lifetime':
      return {
        strategies_limit: -1, // unlimited
        clone_limit: -1,
        scale_limit: -1
      };
    default:
      return {
        strategies_limit: 0,
        clone_limit: 0,
        scale_limit: 0
      };
  }
};
