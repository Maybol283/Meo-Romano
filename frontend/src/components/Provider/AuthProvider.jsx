// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Update this function as needed to toggle authentication state
  const toggleAuth = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
    if (isLoggedIn) {
      sessionStorage.setItem("isAdminAuthenticated", "true");
    } else {
      sessionStorage.removeItem("isAdminAuthenticated");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
