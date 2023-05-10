/** @format */

import Cookies from "js-cookie";
import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  loginSet: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loginSet: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = Cookies.get("token");
  const user = Cookies.get("users");
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    (token !== undefined && user !== undefined) ? true : false
  );

  const loginSet = () => {
    // logic to handle login
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('users');

    // logic to handle logout
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginSet, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
