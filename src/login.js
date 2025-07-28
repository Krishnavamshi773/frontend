import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/students/login", credentials);
      alert("Login successful! Welcome " + response.data.student.name);
      // redirect to dashboard or set user state
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert("Login failed: " + error.response.data.error);
      } else {
        alert("Login failed. Please try again.\n" + (error.message || ""));
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f4f8" }}>
      <form onSubmit={handleLogin} style={{ padding: 40, borderRadius: 8, background: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: 20, padding: 10, width: 250 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: 20, padding: 10, width: 250 }}
        />
        <button type="submit" style={{ padding: 10, width: "100%", background: "#2575fc", color: "#fff", border: "none", borderRadius: 4 }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
