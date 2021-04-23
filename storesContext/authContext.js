import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // this event is triggered when we log in and it contains the user credentials
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login occured");
    });

    // this event is triggered when we log out and it contains the user credentials
    netlifyIdentity.on("logout", (user) => {
      setUser(null);
      console.log("logout occured");
      console.log(user);
    });

    // implementing auth ready functionality
    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
      console.log("authReady event");
    });

    // init netlify identity connection
    netlifyIdentity.init();

    // this will fire whenever the AuthContextProvider unmounts and the login and logout functions will unregister
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open(); // this create a modal for login and signup
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  // object to store user,login,logout and authReady states
  const contextStates = {
    user: user,
    login: login,
    logout: logout,
    authReady: authReady,
  };

  return (
    <AuthContext.Provider value={contextStates}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
