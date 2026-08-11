import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gonomad_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gonomad_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('gonomad_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('gonomad_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('gonomad_user', JSON.stringify(res.data.user));
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed. Check credentials.' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('gonomad_user', JSON.stringify(res.data.user));
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Signup failed.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gonomad_user');
    localStorage.removeItem('gonomad_token');
  };

  const googleLogin = async (credential) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/google`, { credential });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('gonomad_user', JSON.stringify(res.data.user));
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Google Login failed.' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, googleLogin, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
