import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ token, setToken ] = useState(Cookies.get('token') || '');
    const [ user, setUser ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);
    // const [isAdmin, setIsAdmin] = useState(false);
    const [authorizationToken, setAuthorizationToken] = useState("");

    const saveTokenInCookie = (serverToken) => {
        setToken(serverToken);
        Cookies.set('token', serverToken, { expires: 30, path: '/' }, );
    };

    const removeTokenFromCookie = () => {
        setToken("");
        Cookies.remove('token');
    };

    let isLoggedIn = !!token;

    // JWT AUTHENTICATION -- to get logged in user data
    useEffect(() => {
        if (token) {
            const updatedAuthorizationToken = `Bearer ${token}`; // Update authorizationToken
            setAuthorizationToken(updatedAuthorizationToken);
            console.log("token available", token);
            const userAuthentication = async () => {
                setIsLoading(true);
                console.log("Authorization Token:", updatedAuthorizationToken);
                const response = await fetch("http://localhost:3000/api/auth/logged_in_user", {
                    method: "GET",
                    headers: {
                        Authorization: updatedAuthorizationToken,
                    },
					credentials: "include"
                });
    
                if (response.ok) {
                    try {
                        const responseData = await response.json();
                        console.log("after login", responseData);
                        setUser(responseData.userData);
                        // setIsAdmin(responseData.userData.isAdmin);
                        setIsLoading(false);
                    } catch (error) {
                        console.log("Error while fetching user data.", error);
                        setIsLoading(false);
                    }
                }
            };
    
            userAuthentication();
        }
    }, [token]);
    

    return (
        <AuthContext.Provider value={{ saveTokenInCookie, removeTokenFromCookie,
            isLoggedIn, user, authorizationToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const authContextValue = useContext(AuthContext);

    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }

    const { saveTokenInCookie, removeTokenFromCookie,
        isLoggedIn, user, authorizationToken, isLoading } = authContextValue;

    const saveToken = (serverToken) => {
        return saveTokenInCookie(serverToken);
    };

    const removeToken = () => {
        return removeTokenFromCookie();
    };

    return { saveToken, removeToken, isLoggedIn, user,
        authorizationToken, isLoading };
};

export { AuthContext, AuthProvider, useAuth };
