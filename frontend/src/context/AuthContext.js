"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
          const user = JSON.parse(userData);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = useCallback((userData) => {
    try {
      setCurrentUser(userData);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error during login:', error);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    try {
      setCurrentUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [router]);

  // Update user data
  const updateUser = useCallback((updatedData) => {
    try {
      const newUserData = { ...currentUser, ...updatedData };
      setCurrentUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }, [currentUser]);

  // Check if user is admin
  const isAdmin = currentUser?.isAdmin || false;

  // Get auth token
  const getToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  // Verify token validity
  const verifyToken = useCallback(async () => {
    const token = getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Token is invalid, logout user
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
      return false;
    }
  }, [getToken, logout]);

  // API call with auth
  const authenticatedFetch = useCallback(async (url, options = {}) => {
    const token = getToken();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };

    try {
      const response = await fetch(url, config);
      
      // If unauthorized, logout user
      if (response.status === 401) {
        logout();
        return null;
      }

      return response;
    } catch (error) {
      console.error('Authenticated fetch error:', error);
      throw error;
    }
  }, [getToken, logout]);

  const value = {
    currentUser,
    loading,
    login,
    logout,
    updateUser,
    isAdmin,
    getToken,
    verifyToken,
    authenticatedFetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};