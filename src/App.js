import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Make sure this matches your filename

const App = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    course: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage({ type: "error", text: "Passwords do not match" });
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/register`,
        {
          name: formData.fullName,
          email: formData.email,
          mobile: formData.phone,
          password: formData.password,
          course: formData.course,
        }
      );
      setMessage({ type: "success", text: "✅ Registration successful!" });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        course: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.error || "❌ Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-bg">
      <form onSubmit={handleSubmit} className="form-card">
        <h2 className="form-title">Student Registration</h2>

        {message.text && (
          <div
            className={`text-sm mb-4 p-3 rounded text-center font-semibold ${
              message.type === "success"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          className="form-input"
          required
        />

        <button
          type="submit"
          className="form-btn"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default App;
