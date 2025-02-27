import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../shared/AppContext/AppContext.hook';
import { useLogin } from '../shared/hooks/Login.hook';

export const Login = () => {
	const { supabaseClient } = useAppContext();
	const { user } = useLogin();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
			}}
		>
			<Auth
				supabaseClient={supabaseClient}
				appearance={{ theme: ThemeSupa }}
				providers={[]}
			/>
		</div>
	);
};
