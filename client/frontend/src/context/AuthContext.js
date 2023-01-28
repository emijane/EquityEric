// Special thanks to GitDaGray for the tutorial
// Not really that important for an app of small scale like this one, but React Context is a good
// way of providing "global" access to certain important pieces of state that dictate major behaviors of the webapp
// Authentication state is important, because if you're not authenticated you shouldn't be able to access the
// chat page in the first places
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user: "FAKE USER TO ALLOW FOR CHAT ROUTE ACCESS (TEMP)"});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;