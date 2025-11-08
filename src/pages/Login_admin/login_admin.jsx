import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login_admin.css";  // ✅ new CSS file
import { UserContext } from "../../context/UserContext";

const Login_admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const validateForm = () => {
    if (!email || !password) {
      setError("All fields are required!");
      return false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError("Enter a valid email address!");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://127.0.0.1:5000/admin_login", {
        email,
        password,
      });

      setUser(res.data.user);
      alert(res.data.message);
      navigate("/admin_home");
    } catch (err) {
      setError("Admin Not Found");
    }
  };

  return (
    <div className="login-bg-admin">
      <div className="login-wrapper-admin">
        <div className="login-card-admin">
          <h3 className="title-admin">Admin Login</h3>

          <div className="switch-container">
            <button className="switch-btn active">Admin Login</button>
            <button className="switch-btn" onClick={() => navigate("/")}>User Login</button>
          </div>

          {error && <div className="alert-box">{error}</div>}

          <form onSubmit={handleLogin}>
            <label className="label">Email address</label>
            <input
              type="email"
              className="input-box"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input-box"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login_admin;
