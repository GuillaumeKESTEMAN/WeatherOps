import { type SupabaseClient, type User } from '@supabase/supabase-js';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext/AppContext.hook';

type TUseLogin = { supabaseClient: SupabaseClient; user: User | null };

export const useLogin = (): TUseLogin => {
	const { supabaseClient } = useAppContext();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabaseClient.auth.getSession();
			setUser(session?.user ?? null);
		};

		checkSession();

		const { data: authListener } = supabaseClient.auth.onAuthStateChange(
			(_, session) => {
				if (session?.user && !user) {
					setUser(session.user);
					Cookies.set('sb-access-token', session.access_token, {
						expires: 1,
					});
				} else if (!session?.user && user) {
					setUser(null);
					Cookies.remove('sb-access-token');
				}
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, [supabaseClient.auth, user]);

	return { supabaseClient, user };
};
