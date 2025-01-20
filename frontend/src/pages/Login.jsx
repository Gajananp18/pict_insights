import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef(null); // Create a reference for the form

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current; // Access the form using the reference
    const formData = new FormData(form); // Create FormData object from the form
    const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

    if (!data.email || !data.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    axios
      .post(`http://localhost:8000/auth/student/login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.data.token);
        toast.success('Login successful!');
        navigate('/home');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
      });
  };

  return (
    <div className="container">
      <Toaster />
      <h1>Student Login</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      <div className="member">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
