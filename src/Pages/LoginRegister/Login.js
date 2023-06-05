import "./LoginRegister.css";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import Loader from "../../Components/Loader/Loader";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, token } = useAuth();
  const { loader, setLoader } = useData();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  const [loginDetails, setLoginDtails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    loginUser(loginDetails.email, loginDetails.password);
    if (token) {
      navigate(location?.state?.from?.pathname || "/product");     
      toast.success("Logged in successfully !");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, loginDetails.email, loginDetails.password]);

  const loginButtonHandle = () => {
    setLoginDtails((prev) => {
      return {
        ...prev,

        // email: "adarshbalika@gmail.com",
        // password: "adarshbalika"

        // email:"testuser45@gmail.com",
        // password:"Test@45"

        email: "aman78@gmail.com",
        password: "Aman@78",
      };
    });
  };


  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDtails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <>
      {loader && <Loader />}
      <div className="auth-container">
        <div className="auth-heading">
          <h2>Login</h2>
        </div>
        <form className="auth-input" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-div">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="test@gmail.com"
              value={loginDetails.email}
              name="email"
              autoComplete="off"
              required
              onChange={inputChangeHandler}
            ></input>
          </div>
          <div className="auth-div">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={loginDetails.password}
              name="password"
              required
              onChange={inputChangeHandler}
            ></input>
          </div>
    
          <div className="auth-btn">
            <button onClick={loginButtonHandle}>
              Login with Test Credentials
            </button>
          </div>
          <div className="auth-text">
            <span onClick={() => navigate("/register")}>
              Create new account{" "}
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
