import { React, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";
import { toast } from "react-toastify";

const Register = () => {
  const { loading, user, handleRegister } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.username || !formData.email || !formData.password) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Invalid email format!");
        return;
      }

      const message = await handleRegister(formData);
      if (user) {
        toast.success(message);

        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-group">
            <label htmlfor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlfor="email">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
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
