import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Load the access token from local storage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const setToken = (token) => {
    // Set the access token in both state and local storage
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const removeToken = () => {
    // Remove the access token from both state and local storage
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  const logout = () => {
    // Call the removeToken function when logging out
    removeToken();
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setToken, removeToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
