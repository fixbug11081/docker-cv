import React from "react";
import { Link } from "react-router";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-group">
            <label htmlfor="username">Username</label>
            <input type="text" placeholder="Enter username" />
          </div>
          <div className="input-group">
            <label htmlfor="email">Email</label>
            <input type="text" placeholder="Enter email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button className="bttn bttn-primary">Register</button>
          <p>
            Already have an account ?<Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
