import "./LoginRegister.css";
import { useNavigate } from "react-router";
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const registerBtnHandler = () => {
    registerUser(
      registerDetails.email,
      registerDetails.password,
      registerDetails.firstName,
      registerDetails.lastName
    );
    navigate("/userprofile");
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="auth-container register-auth-container">
        <div className="auth-heading">
          <h2>Register</h2>
        </div>
        <form className="auth-input" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-div">
            <label>First name</label>
            <input
              type="text"
              placeholder="Test"
              value={registerDetails.firstName}
              name="firstName"
              autoComplete="off"
              onChange={inputChangeHandler}
              required
            ></input>
          </div>
          <div className="auth-div">
            <label>Last name</label>
            <input
              type="text"
              placeholder="User"
              value={registerDetails.lastName}
              name="lastName"
              autoComplete="off"
              onChange={inputChangeHandler}
              required
            ></input>
          </div>
          <div className="auth-div">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="test@gmail.com"
              value={registerDetails.email}
              name="email"
              autoComplete="off"
              onChange={inputChangeHandler}
              required
            ></input>
          </div>
          <div className="auth-div">
            <label>Password</label>
            <input
              type= {showPassword ? "text" : "password"}
              placeholder="******"
              value={registerDetails.password}
              name="password"
              autoComplete="off"
              onChange={inputChangeHandler}
              required
            ></input>
            {registerDetails.password ? (
              <i
                className={`fa pw ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                aria-hidden="true"
                onClick={()=>{setShowPassword(!showPassword)}}
              ></i>
            ) : (
              ""
            )}
          </div>
          <div className="auth-btn">
            <button onClick={registerBtnHandler}>Register</button>
          </div>
          <div className="auth-text">
            <span onClick={() => navigate("/login")}>
              Already have an account?{" "}
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
