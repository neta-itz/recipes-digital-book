import { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../../api/http";

import "./NewPasswordPage.css";

const NewPasswordPage = () => {
  const history = useHistory();

  const [resetPassword, setResetPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [resetPasswordError, setResetPasswordError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") return;
    http
      .post("/users/reset-password", {
        resetPassword,
        email,
        password,
      })
      .then((res) => {
        localStorage.clear();
        history.push("/login");
      })
      .catch((error) => {
        setResetPasswordError(true);
      });
  };

  return (
    <div id="bgc" className="loginContainer">
      <h1 className="loginHeader forgotHeader">Create New Password</h1>
      <div className="loginFormWrap forgotForm d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group formGroup1">
            <label
              htmlFor="number"
              className="form-label forgotFormControlLabel"
            >
              Number Verification
            </label>
            <input
              type="string"
              className="form-control formControlForgot"
              id="number"
              aria-describedby="emailHelp"
              placeholder="Verifay Number"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label forgotFormControlLabel"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control formControlForgot"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="exampleInputPassword"
              className="form-label forgotFormControlLabel"
            >
              New Password
            </label>
            <input
              type="password"
              className="form-control formControlForgot"
              id="exampleInputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {resetPasswordError && (
              <div className="errMsg">
                * Password should be at list 8 charcters, 1 upper case, at list
                1 lower case, at list 4 numbers and 1 symbols
              </div>
            )}
          </div>
          <br></br>
          <button
            type="submit"
            className="btn btn-m d-grid gap-2 loginBtn forgotBtn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
