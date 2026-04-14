import { createClient } from '@supabase/supabase-js';

/**
 * SECURITY FIX: Removed hardcoded fallback Supabase credentials.
 * Environment variables are REQUIRED for full functionality.
 *
 * Set these in your .env file:
 *   VITE_SUPABASE_URL=https://your-project.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn(
    '[SmallBizRecon] Missing Supabase environment variables. ' +
    'Auth, database, and storage features will be unavailable. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Create client even with empty strings — allows app to render.
// Supabase calls will fail gracefully at the network level.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
