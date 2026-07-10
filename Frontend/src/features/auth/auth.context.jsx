import { createContext, useState, useEffect } from "react";
import { getMe } from "../auth/services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user once on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      console.log("Initializing auth...");
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.error("Init auth error:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);
  /*
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };*/
  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
