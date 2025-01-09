// // src/context/AuthContext.jsx

// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   useEffect(() => {
//     setIsAuthenticated(!!localStorage.getItem('token'));
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);  // Update authentication state
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);  // Clear authentication state
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setIsAuthenticated(!!storedToken); // Update authentication state
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken); // Set the token
    setIsAuthenticated(true); // Update authentication state
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null); // Clear the token
    setIsAuthenticated(false); // Clear authentication state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
