import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/auth.hook";

const Header = () => {
  const { user, loading, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleExit = async (e) => {
    e.preventDefault();
    try {
      await handleLogout();
      navigate("/"); // redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="logout">
      <button type="button" onClick={handleExit}>
        Logout
      </button>
    </div>
  );
};

export default Header;
