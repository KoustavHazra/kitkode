import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Logout = () => {
    const { removeToken } = useAuth();

    
    useEffect(() => {
        const logout = async () => {
            await removeToken();
        };
        console.log("logged out 1");
        logout();
    }, [removeToken]);
    // useEffect(() => {
    //     removeToken();
    // }, [removeToken]);

    return <Navigate to="/login" />;
};

export default Logout;