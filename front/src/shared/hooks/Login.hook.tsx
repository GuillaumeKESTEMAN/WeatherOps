import { createClient, type SupabaseClient, type Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const DB_URL = import.meta.env.VITE_DB_URL;
const DB_API_KEY = import.meta.env.VITE_DB_API_KEY;

type TUseLogin = { supabaseClient: SupabaseClient, session: Session | null }

export const useLogin = (): TUseLogin => {

    const supabaseClient = createClient(DB_URL, DB_API_KEY);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabaseClient.auth.getSession();
            setSession(session);
        };

        checkSession();

        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log('session :',session);
            console.log('event :',event);
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return { supabaseClient, session };

}