import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Toaster,toast } from 'react-hot-toast'

const Login = () => {
    const navigate=useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        let form=new FormData(formElement)
        let formData={}
        for(let [key,value] of form.entries())
        {
            formData[key]=value
        }
        // console.log(formData);

        axios.post(`http://localhost:8000/auth/student/login`,formData)
        .then(res => {
            localStorage.setItem('token', res.data.data.token);
            navigate('/home');
        })
        .catch(err =>{
            toast.error(err)
        })
    }

  return (
        <div className="container ">
            <h1>Student Login</h1>
            <form id="formElement">
                <input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder='Email' />

                <input  id="password"
                        name="password"
                        type="password"
                        placeholder="Password" />
            </form>
            <button type="submit" onClick={handleSubmit}>
                LogIn
            </button>
            <div className="member">
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </div>
  )
}

export default Login