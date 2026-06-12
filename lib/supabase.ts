import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

console.log("--- SUPABASE DEBUG INFO ---");
console.log("TARGET URL:", supabaseUrl);
console.log("KEY PRESENT:", !!supabaseAnonKey);
console.log("KEY LENGTH:", supabaseAnonKey.length);
console.log("---------------------------");

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
