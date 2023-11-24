import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  isEmailValid,
  isPasswordValid,
  isFullnameValid,
} from "../../validation/validation";

const Register = () => {
  const initialUserState = {
    fullname: "",
    emailid: "",
    password: "",
  };
  const initialValidateState = {
    fullname: "",
    vemail: "",
    vpassword: "",
  };
  const navigate = useNavigate();
  const [userDet, setUserDet] = useState(initialUserState);
  const [isLoading, setisLoading] = useState(false);
  const [validate, setValidate] = useState(initialValidateState);

  const resetValidateState = () => {
    setValidate(initialValidateState);
  };

  const inputHandleChange = (e) => {
    const { name, value } = e.target;
    setUserDet({ ...userDet, [name]: value });
  };

  const registerUser = async () => {
    try {
      if (isLoading) {
        return;
      }
      setisLoading(true);

      const { fullname, emailid, password } = userDet;

      // Validation for different inputs
      if (!isFullnameValid(fullname)) {
        setValidate({ ...validate, fullname: "fullname cannot be empty" });
        return;
      }

      if (!isEmailValid(emailid)) {
        setValidate({ ...validate, vemail: "Email not valid" });
        return;
      }

      if (!isPasswordValid(password)) {
        setValidate({
          ...validate,
          vpassword: "password should have at least 8 characters",
        });
        return;
      }

      resetValidateState();

      //  Post req sent for registering user in database
      await axios
        .post("http://localhost:5001/registeruser", {
          fullname,
          emailid, 
          password,
        })
        .then((response) => {
          console.log("user registration", response);
          alert("User registered");
          navigate('/')
        });
    } catch (error) {
      console.error("Error while registering user", error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="container login-box p-5 pb-1 mt-5">
      <div className="text-center mt-2">
        <h3>Register</h3>
        <p className="fw-light">
          Welcome!Your journey to a seamless and delightful shopping experience
          begins here.
        </p>
      </div>
      <div className="text-start">
        <label className="fw-light mb-2">Full name</label>
        <br />
        <input
          className="mb-0"
          type="text"
          name="fullname"
          onChange={inputHandleChange}
        />
        <br />
        <span className="text-end text-danger fw-light">
          {validate.fullname}
        </span>
        <br />
        <label className="fw-light mb-2">Email</label>
        <br />
        <input
          className="mb-0"
          type="email"
          name="emailid"
          onChange={inputHandleChange}
        />
        <br />
        <span className="text-end text-danger fw-light">{validate.vemail}</span>
        <br />
        <label className="fw-light mb-2">Password</label>
        <br />
        <input
          className="mb-0"
          type="password"
          name="password"
          onChange={inputHandleChange}
        />
        <br />
        <span className="text-end text-danger fw-light">
          {validate.vpassword}
        </span>
        <br />
      </div>
      <div className="mt-4">
        <button onClick={registerUser}>
          {isLoading ? "Loading..." : "Register"}
        </button>
        <p className="fw-light text-center mt-2">
          Already have an account?
          <span onClick={() => navigate("/login")} className="fw-bold">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
