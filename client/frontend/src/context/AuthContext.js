// Special thanks to GitDaGray for the tutorial
// Not really that important for an app of small scale like this one, but React Context is a good
// way of providing "global" access to certain important pieces of state that dictate major behaviors of the webapp
// Authentication state is important, because if you're not authenticated you shouldn't be able to access the
// chat page in the first places
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user: "FAKE USER TO ALLOW FOR CHAT ROUTE ACCESS (TEMP)"});
    const [loading, setLoading] = useState(true);
    // I'm additionally gonna have a useEffect that happens on every reload, that pings the "refresh" endpoint 
    // to check if we have an http refresh token and persist our logged-in state upon refresh

    const persistAuth = async () => {
        fetch(`http://localhost:3001/api/refresh`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then((response) => response.json())
        .then((AuthJSON) => {
            // Our refresh endpoint should sort of return to us an "accessToken" which is literally just the refreshToken but
            // we can store it locally so react is aware of our Auth state
            setAuth((prev) => {
                // Want to see previous auth state for debugging
                console.log(prev);
                // Want to see new state for debugging
                console.log(AuthJSON);
                // Then update the new state
                return AuthJSON;
            });
            setLoading(false) // Page should no longer be loading after this
        }).catch(err => {
            console.log(err) //Print out error if it happened
        }).finally(() => {
            setLoading(false) // If loading is not yet false, set it to false.
        })
    }
    useEffect(() => {
        persistAuth();
    }, [])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {loading ? <div>No</div> : children} 
        </AuthContext.Provider>
    )
}

export default AuthContext;