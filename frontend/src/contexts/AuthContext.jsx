import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const getErrorMessage = (error, defaultMessage) => {
  if (error?.response) {
    const data = error.response.data;
    if (!data) {
      return defaultMessage;
    }

    if (typeof data === 'string') {
      return data;
    }

    if (data.error) {
      return data.error;
    }

    if (data.message) {
      return data.message;
    }

    if (data.errors) {
      if (typeof data.errors === 'string') {
        return data.errors;
      }
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        const firstError = data.errors[0];
        return firstError?.message || firstError || defaultMessage;
      }
    }

    return JSON.stringify(data);
  }

  if (error?.message) {
    return error.message;
  }

  return defaultMessage;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('authUser');

    if (token && savedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    try {
      const response = await axios.post('/api/auth/login', { phone, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('authUser', JSON.stringify({ ...userData, token }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ ...userData, token });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error, 'Login failed. אנא נסה שוב.'),
      };
    }
  };

  const register = async (name, phone, password) => {
    try {
      const response = await axios.post('/api/auth/register', { name, phone, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('authUser', JSON.stringify({ ...userData, token }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ ...userData, token });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error, 'Registration failed. אנא בדוק את הנתונים.'),
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAdmin = () => {
    return user?.isAdmin === true;
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};