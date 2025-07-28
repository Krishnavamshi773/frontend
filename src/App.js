import React, { useState } from "react";
import axios from "axios";

const App = () => {
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/register`, // Use env var
        formData
      );
      alert("Registration successful");
      console.log(res.data);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Error registering student: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-md mx-auto mt-10 space-y-3">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="course" placeholder="Course" onChange={handleChange} required className="w-full p-2 border rounded" />
      <button type="submit" className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</button>
    </form>
  );
};

export default App;
