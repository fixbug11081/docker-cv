import React, { useState } from "react";
import "../../auth/auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...........</h1>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter email id"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bttn bttn-primary">Login</button>
          <p>
            Don't have an account ?<Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
