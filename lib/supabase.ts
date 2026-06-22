import { createClient } from '@supabase/supabase-js'

// ✅ Build-Safe Environment Check
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("⚠️ WARNING: NEXT_PUBLIC_SUPABASE_URL is missing. Using build placeholder.");
}

// ✅ Isolated Supabase Clients
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

// ✅ Auto-clear stale/invalid refresh tokens to prevent AuthApiError
// This fires when Supabase detects a TOKEN_REFRESHED failure
supabase.auth.onAuthStateChange((event) => {
    if (event === 'TOKEN_REFRESHED') return; // healthy, ignore
    if (event === 'SIGNED_OUT') {
        // Clear any stale user session data
        if (typeof window !== 'undefined') {
            localStorage.removeItem('parabolica-user-auth');
        }
    }
});

supabaseAdmin.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('parabolica-admin-auth');
        }
    }
});
