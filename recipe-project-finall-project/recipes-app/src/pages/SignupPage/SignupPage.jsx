import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Joi from "joi-browser";
import http from "../../api/http";

import signupSchema from "../../validation/Signup.validation";

import "react-toastify/dist/ReactToastify.css";
import "./SignupPage.css";

toast.configure();

const SignUpPage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate(
      { name, email, password },
      signupSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedValue;

    if (error) {
      let newNameErr = [];
      let newEmailErr = [];

      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "name") {
          newNameErr = [...newNameErr, errMsg];
        }
        if (errSrc === "email") {
          newEmailErr = [...newEmailErr, errMsg];
        }
        if (errSrc === "password") {
          setPasswordError(true);
        }
      });

      setNameError(newNameErr);
      setEmailError(newEmailErr);
    } else {
      http
        .post("/users/register", { name, email, password })
        .then((res) => {
          history.push("/login", { email, password, register: true });
        })
        .catch((err) => {
          if (err.response) {
            toast.error("User alredy exist");
          }
        });
    }
  };

  return (
    <div id="bgcSignUp">
      <h1 className="signupHeader">Please Sign-Up</h1>
      <div className="formWrap d-flex align-items-center justify-content-center">
        <form className="row signupFormAndPic" onSubmit={handleSignUp}>
          <div className="mb-3 col-10 signupLableAndInput">
            <label htmlFor="inputName4" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control form-control"
              id="inputName4"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            {nameError.map((item, idx) => {
              return (
                <div key={idx} className="errMsg">
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mb-3 col-10 signupLableAndInput">
            <label htmlFor="inputEmail4" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control form-control"
              id="inputEmail4"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />
            {emailError.map((item, idx) => {
              return (
                <div key={idx} className="errMsg">
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mb-3 col-10 signupLableAndInput">
            <label htmlFor="inputPassword4" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control form-control"
              id="inputPassword4"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            {passwordError && (
              <div className="errMsg">
                Password should be at list 8 charcters, 1 upper case, at list 1
                lower case, at list 4 numbers and 1 symbols
              </div>
            )}
          </div>

          <div className="sighnupBtnDiv">
            <button
              type="submit"
              className="btn btn-lg d-grid gap-2 signupLableAndInput"
              id="signupBtn"
            >
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
