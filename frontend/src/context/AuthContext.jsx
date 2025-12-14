import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = (token, role) => {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, isLoggedIn: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
