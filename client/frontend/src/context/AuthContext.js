// Special thanks to GitDaGray for the tutorial
// Not really that important for an app of small scale like this one, but React Context is a good
// way of providing "global" access to certain important pieces of state that dictate major behaviors of the webapp
// Authentication state is important, because if you're not authenticated you shouldn't be able to access the
// chat page in the first places
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user: "FAKE USER TO ALLOW FOR CHAT ROUTE ACCESS (TEMP)"});
    const [loading, setLoading] = useState(false);
    // I'm additionally gonna have a useEffect that happens on every reload, that pings the "refresh" endpoint 
    // to check if we have an http refresh token and persist our logged-in state upon refresh
    const exampleFetch = async () => {
        fetch('https://e440-2601-601-1b80-33a0-99e8-519d-5797-1c39.ngrok.io/')
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    // Used to be refresh endpoint, now we just check localStorage for token 🥳🥳🥳
    const persistAuth = async () => {
        let accessToken = localStorage.getItem("askEricAccessToken")
        console.log(accessToken);

        setAuth({accessToken: accessToken});
    }
    useEffect(() => {
       persistAuth();
    }, [])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
           {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;