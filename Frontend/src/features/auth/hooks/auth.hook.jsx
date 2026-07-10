import { useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, getMe, register } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.error("Login error:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      if (data.success) {
        setUser(data.data.user);
        return data.data.message;
      } else {
        setUser(null);
        return data.error.message;
      }
    } catch (err) {
      console.error("Register error:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
