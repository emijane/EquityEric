import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * @function ProtectedRoute is a component that wraps over views/components/pages that we want to protect by making sure
 * that the user is authenticated. Basically provides an outlet to the requested page if user is authenticated,
 * otherwise redirects them to login / home
 * 
 * @returns 
 */
const ProtectedRoute = ({}) => {
    const {auth, loading}  = useAuth();

    if (loading) {
        return <div>Loading...</div>
    } else
    return (
        auth.accessToken ? 
            <Outlet/> :
            <Navigate to="/"/>
    )
}

export default ProtectedRoute;