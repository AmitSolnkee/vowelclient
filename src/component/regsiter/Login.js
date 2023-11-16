import React, { useState } from "react";
import "./login.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const inputHandleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
   
  };

  const loginHandler = async () => {
    const { email, password } = loginUser;
    try {
      let response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      const { token } = response?.data;
      localStorage.setItem("token", token);
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container login-box p-5 pb-1 mt-5">
      <div className="text-center mt-2">
        <h3>LOGIN</h3>
        <p className="fw-light">Welcome back!Login with your credentials</p>
      </div>
      <div className="text-start">
        <label className="fw-light mb-2">Email</label>
        <br />
        <input type="email" name="email" onChange={inputHandleChange} />
        <br />
        <label className="fw-light mb-2">Password</label>
        <br />
        <input type="password" name="password" onChange={inputHandleChange} />
      </div>
      <div className="mt-4">
        <button onClick={loginHandler}>Login</button>
        <p className="fw-light text-center mt-2">
          Don't have an account?<span className="fw-bold" onClick={()=>navigate('/register')}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
