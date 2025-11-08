import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required!");
      return false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError("Enter a valid email!");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password,
      });
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.signupBg}>
      <div style={styles.signupWrapper}>
        <h3 style={styles.title}>Create Account</h3>

        {error && <div style={styles.alertBox}>{error}</div>}

        <form onSubmit={handleSignup}>
          <label style={styles.label}>Full Name</label>
          <input type="text" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />

          <label style={styles.label}>Email address</label>
          <input type="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />

          <label style={styles.label}>Password</label>
          <input type="password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" style={styles.signupButton}>
            Sign Up
          </button>
        </form>

        <p style={styles.bottomText}>
          Already have an account?
          <Link to="/" style={styles.link}> Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  signupBg: {
    height: "100vh",
    width: "100%",
    background: "radial-gradient(circle at top, #141b29, #000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signupWrapper: {
    width: "420px",
    padding: "30px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 0 35px rgba(0, 229, 255, 0.25)",
    color: "white",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "800",
    color: "#00e5ff",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    marginTop: "12px",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255,255,255,0.15)",
    outline: "none",
    color: "white",
    fontSize: "1rem",
  },
  signupButton: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#00e5ff",
    color: "black",
    fontWeight: "bold",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  alertBox: {
    padding: "10px",
    background: "rgba(255, 0, 0, 0.3)",
    borderRadius: "8px",
    color: "#ff4d4d",
    textAlign: "center",
    marginBottom: "10px",
  },
  bottomText: {
    marginTop: "14px",
    textAlign: "center",
  },
  link: {
    color: "#00e5ff",
    fontWeight: "bold",
    marginLeft: "5px",
    textDecoration: "none",
  },
};

export default Signup;
