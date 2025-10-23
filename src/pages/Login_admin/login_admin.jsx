import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      console.log(res.data.user);

      alert(res.data.message);
      navigate("/admin_home"); // redirect after admin login
    } catch (err) {
      setError("Admin Not Found");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card admin-card shadow-lg">
            <div className="card-body">
              <h3 className="text-center mb-3 admin-title">Admin Login</h3>

              <div className="login-toggle text-center mb-4">
                <button
                  className="btn btn-outline-primary me-2 active-btn"
                  onClick={() => navigate("/admin_login")}
                >
                  Admin Login
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/")}
                >
                  User Login
                </button>
              </div>
              <center>              {error && <div className="alert alert-danger">{error}</div>}
</center>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_admin;
