import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';


const LoginAdmin = () => {
  const navigate = useNavigate();
  const formRef = useRef(null); // Properly defined ref for the form

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form); // Using formRef correctly
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    axios
      .post(`http://localhost:8000/auth/admin/login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.data.token);
        toast.success('Login successful!');
        navigate('/adminHome');
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
      <h1>Admin Login</h1>
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
        Don't have an account? <Link to="/adminSignup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginAdmin;
