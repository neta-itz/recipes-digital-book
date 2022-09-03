import { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../../store/auth";

import Joi from "joi-browser";
import http from "../../api/http";
import jwt_decode from "jwt-decode";

import loginSchema from "../../validation/Login.validation";
import "./LoginPage.css";

toast.configure();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState(false);

  const emailRef = useRef(null);

  const history = useHistory();
  const location = useLocation();

  //for redux actions
  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigateToUserOrNot = (isRegister = true) => {
    if (isRegister) {
      history.push("/foodPanel");
    } else {
      history.push("/home");
    }
  };

  const handleOnSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const validatedValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validatedValue;

    if (error) {
      dispatch(authActions.logout());

      let newEmailErr = [];
      let newPasswordErr = [];
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "email") {
          newEmailErr = [...newEmailErr, errMsg];
        }
        if (errSrc === "password") {
          setPasswordError(true);
          newPasswordErr = [...newPasswordErr, errMsg];
        }
      });
      setEmailError(newEmailErr);
    } else {
      http
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          dispatch(authActions.login());

          localStorage.setItem("tokenKey", res.data.token);

          const decoded = jwt_decode(res.data.token);

          dispatch(authActions.updateUser(decoded));

          if (location.state === null) {
            navigateToUserOrNot(decoded.register);
          } else {
            if (!location.state) return history.push("/home");
            if (location.state.fromPage) {
              history.push(location.state.fromPage);
            } else {
              navigateToUserOrNot(decoded.register, location.state.register);
            }
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error("Email and/or password incorrect");
          }
          localStorage.clear();
          dispatch(authActions.logout());
        });
    }
  };

  const handleForgetPassword = () => {
    if (email === "") return;
    http
      .post("/users/reset-password-code", {
        email,
      })
      .then((res) => {
        console.log(res.data);
        history.push("/newPassword");
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Something went worng, can't create new password");
        }
      });
  };

  const memoizedCallback = useCallback(() => {
    if (location.state) {
      if (location.state.email && location.state.password) {
        if (!email || !password) {
          setEmail(location.state.email);
          setPassword(location.state.password);
        } else {
          handleOnSubmit();
        }
      }
    }
  }, [location.state, handleOnSubmit]);

  useEffect(() => {
    memoizedCallback();
  }, [location.state, email, password, memoizedCallback]);

  return (
    <div id="bgc" className="loginContainer">
      <h1 className="loginHeader">Please Login</h1>
      <div className="loginFormWrap d-flex align-items-center justify-content-center">
        <form className="loginForm" onSubmit={handleOnSubmit}>
          <div className="mb-3 col-12 loginLableAndInput">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              ref={emailRef}
            ></input>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            {emailError.map((item, idx) => {
              return (
                <div key={idx} className="errMsg">
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mb-3 col-12 loginLableAndInput">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            {passwordError && (
              <div className="errMsg">
                Password should be at list 8 charcters, 1 upper case, at list 1
                lower case, at list 4 numbers and 1 symbols
              </div>
            )}
          </div>

          <button
            className="forgotPasswordBtn"
            type="button"
            onClick={handleForgetPassword}
          >
            Forget Password
          </button>
          <button className="btn btn-m d-grid gap-2 loginBtn">Login</button>

          {loggedInRedux}
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
