import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../../shared/AppContext/AppContext.hook';
import { useLogin } from '../../../shared/hooks/Login.hook';
import './LoginButton.css';

export const LoginButton = () => {
    const { supabaseClient } = useAppContext();
	const { user } = useLogin();
	const navigate = useNavigate();

	const routeChange = () => {
        if (user) {
			try {
				supabaseClient.auth.signOut();
			} catch (error) {
				console.error('Erreur lors de la déconnexion:', error);
			}
		} else {
			navigate('/login');
		}
	};

	return (
		<div className="login-button absolute z-5">
			<Button
				label={user ? 'Disconnect' : 'Login'}
				onClick={routeChange}
				severity={user ? 'danger' : 'info'}
			/>
		</div>
	);
};
