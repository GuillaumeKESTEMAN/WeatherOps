import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa} from '@supabase/auth-ui-shared'

const DB_URL = import.meta.env.VITE_DB_URL;
const DB_API_KEY = import.meta.env.VITE_DB_API_KEY

export const Login = () => {
  
    const supabase = createClient(DB_URL, DB_API_KEY )
    const getRedirectURL = () => {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      return `${origin}`;
    };

    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        window.location.href = '/'
        
      }
    });

    return (
      <div style={{ 
         display: 'flex', 
         justifyContent: 'center', 
         alignItems: 'center', 
         minHeight: '100vh',
      }}>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa}}
          providers={[]}          
        />
      </div>
  )
}
