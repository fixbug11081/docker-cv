import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("Protected:", { loading, user });
  if (loading) {
    return (
      <main>
        <h1>Loading.........</h1>
      </main>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
