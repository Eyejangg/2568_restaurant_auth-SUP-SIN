import { useState, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import tokenService from "../services/token.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = (user) => setUser(user); // Set user state when logging in
  const logout = () => {
    AuthService.logout(); // Clear user data from service/local storage
    setUser(null); // Clear user state
  };

  // useEffect เพื่อโหลด user ตอน mount
  useEffect(() => {
    const currentUser = tokenService.getUser(); // Retrieve user from local storage
    setUser(currentUser);
  }, []);

  function getUser() {
    const currentUser = tokenService.getUser(); // Retrieve user from local storage
    return currentUser;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {" "}
      //
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return AuthContext;
};
