import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    course: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/students`, formData);
      alert("Registration successful");
      console.log(res.data);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error registering student");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
      <input type="text" name="course" placeholder="Course" onChange={handleChange} required />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Register</button>
    </form>
  );
};

export default Register;
