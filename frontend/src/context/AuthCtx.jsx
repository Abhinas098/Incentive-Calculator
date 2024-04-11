import React, { useState } from "react";
import { createContext } from "react";

const AuthCtx = createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthCtxProvider = (props) => {
  const initialToken = localStorage.getItem("token") || null;
  const [token, setToken] = useState(initialToken);

  const userLogIn = !!token;

  const logInHandler = (token) => {
    setToken(JSON.stringify(token));
    localStorage.setItem("token", JSON.stringify(token));
  };
  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token ? JSON.parse(token) : null,
    isLogin: userLogIn,
    login: logInHandler,
    logout: logOutHandler,
  };

  return (
    <AuthCtx.Provider value={contextValue}>{props.children}</AuthCtx.Provider>
  );
};
export default AuthCtx;
