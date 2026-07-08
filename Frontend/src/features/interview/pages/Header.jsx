import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/hooks/useAuth";

const Header = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleExit = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <div className="logout">
      <button onClick={handleExit}>Logout</button>
    </div>
  );
};
export default Header;
