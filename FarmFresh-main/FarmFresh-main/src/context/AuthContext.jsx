import React, { createContext, useContext, useState } from 'react';

// Create context for authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
    });
  };

  const signup = async (email, password, name) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email,
      name,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
