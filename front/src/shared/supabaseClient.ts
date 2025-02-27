import { createClient } from '@supabase/supabase-js';

const DB_URL = import.meta.env.VITE_DB_URL;
const DB_API_KEY = import.meta.env.VITE_DB_API_KEY;

const supabaseClient = createClient(DB_URL, DB_API_KEY, {
        auth: {
            storage: window.localStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        },
    });

export { supabaseClient };
