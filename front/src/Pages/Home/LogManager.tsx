import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import "./Home.css";
import { useLogin } from "../../shared/hooks/Login.hook";


export const LogManager = () => {

    let StateLoginUser: string;
    let navigate = useNavigate();
    const { supabaseClient } = useLogin();

    function findAuthTokenInLocalStorage(): string | null {
        const authTokenKeyPattern = /auth-token/i;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && authTokenKeyPattern.test(key)) {


                return localStorage.getItem(key);
            }
        }
        return null;
    }

    function createCookie() {
        let jsonFromLocalStorageToCookie = JSON.stringify(findAuthTokenInLocalStorage());
        const cookieName = "InformationOfUser";
        const cookieValue = encodeURIComponent(jsonFromLocalStorageToCookie);
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expires.toUTCString()}; path=/;`;
    }


    const routeChange = () => {
        if (StateLoginUser === "Disconnect") {
            //Effacer cookies
            try {
                supabaseClient.auth.signOut();
                document.cookie = `"InformationOfUser"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
            }
        }else{
            let path = `/login`;
            navigate(path);
        }
        
    }

    if (findAuthTokenInLocalStorage() !== null) {
        createCookie();
        StateLoginUser = "Disconnect"
    } else {
        StateLoginUser = "Login"
    }

    return (
        <div className='log'>
            <Button label={StateLoginUser} onClick={routeChange} severity={StateLoginUser === "Disconnect" ? "danger" : "info"}
            />
        </div>
    )
}

