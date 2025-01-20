import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUpAdmin = () => {
  const navigate = useNavigate();
  const formElement = useRef(null); // Create a reference for the form

  function handleSubmit(e) {
    e.preventDefault();
    console.log("handling signup...");

    let form = new FormData(formElement.current); // Access form through the ref
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);

    axios.post(`http://localhost:8000/auth/admin/register`, formData)
      .then(res => {
        navigate('/adminLogin');
      })
      .catch(err => {
        console.log("Error catched ----->>>>>> ", err);
      });
  }

  return (
    <div className="container">
      <h1>Admin Sign Up</h1>
      <form ref={formElement}> {/* Attach the ref to the form */}
        <input 
          id="email"
          name="email"
          type="email" 
          placeholder='Email' />

        <input 
          id="password"
          name="password"
          type="password"
          placeholder="Password" />
      </form>

      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>

      <div className="member">
        Already have an account? <Link to='/adminLogin'>Login</Link>
      </div>
    </div>
  );
}

export default SignUpAdmin;
