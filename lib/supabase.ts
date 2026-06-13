import { createClient } from '@supabase/supabase-js'

// ✅ Build-Safe Environment Check
// If variables are missing during Vercel pre-rendering, we use placeholders 
// to prevent the build from crashing. Real values will be used at runtime.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("⚠️ WARNING: NEXT_PUBLIC_SUPABASE_URL is missing. Using build placeholder.");
}

// ✅ Isolated Supabase Clients
// We use different storage keys to ensure Admin and User logins are completely independent.

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storageKey: 'parabolica-user-auth',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storageKey: 'parabolica-admin-auth',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
