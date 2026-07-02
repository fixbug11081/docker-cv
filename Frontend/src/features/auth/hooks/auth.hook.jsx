import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, getMe, register } from "../services/auth.api";

export const useAuth = () => {
  const userContext = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = userContext;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log("Error is  " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      setUser(data.user);
      setLoading(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logout();
      setUser(null);
      setLoading(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        setLoading(true);

        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
