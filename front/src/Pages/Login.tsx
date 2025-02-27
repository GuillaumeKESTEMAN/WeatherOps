import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useLogin } from '../shared/hooks/Login.hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Login = () => {

  const { supabaseClient, session } = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </div>
  )
}
