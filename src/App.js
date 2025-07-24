import React, { useState } from "react";
import axios from "axios";

function App() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (student.password !== student.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const payload = {
        name: student.name,
        email: student.email,
        password: student.password,
        mobile: student.mobile,
        course: student.course,
      };
      await axios.post("http://localhost:5000/api/register", payload);
      alert("Student Registered!");
      setStudent({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        course: "",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert("Registration failed: " + error.response.data.error);
      } else {
        alert("Registration failed. Please try again.\n" + (error.message || ""));
      }
    }
  };

  // Inline styles for modern look
  const styles = {
    mainBg: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
    },
    card: {
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
      padding: "40px 32px 32px 32px",
      minWidth: 350,
      maxWidth: 400,
      width: "100%",
      margin: "32px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#2575fc",
      marginBottom: 24,
      letterSpacing: 1,
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 18,
    },
    row: {
      display: "flex",
      gap: 12,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      padding: "12px 14px",
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      fontSize: 16,
      outline: "none",
      transition: "border 0.2s",
      marginBottom: 0,
      background: "#f7f9fa",
    },
    inputFocus: {
      border: "1.5px solid #2575fc",
    },
    btn: {
      width: "100%",
      padding: "12px 0",
      background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontWeight: 600,
      fontSize: 18,
      cursor: "pointer",
      marginTop: 10,
      boxShadow: "0 2px 8px rgba(37,117,252,0.08)",
      transition: "background 0.2s, box-shadow 0.2s",
    },
    inputLabel: {
      fontWeight: 500,
      marginBottom: 6,
      color: "#333",
      fontSize: 15,
    },
  };

  return (
    <div style={styles.mainBg}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Registration</h1>
        <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <div style={styles.row}>
            <input
              style={styles.input}
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div style={styles.row}>
            <input
              style={styles.input}
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div style={styles.row}>
            <input
              style={styles.input}
              name="mobile"
              value={student.mobile}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
          <div style={styles.row}>
            <input
              style={styles.input}
              name="password"
              type="password"
              value={student.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            </div>
            <div style={styles.row}>
            <input
              style={styles.input}
              name="confirmPassword"
              type="password"
              value={student.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
           </div>
          
          <div style={styles.row}>
            <input
              style={styles.input}
              name="course"
              value={student.course}
              onChange={handleChange}
              placeholder="Course"
              required
            />
          </div>
          <button style={styles.btn} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;