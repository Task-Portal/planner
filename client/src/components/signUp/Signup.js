import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../../auth";
import "./signup.css";

const Signup = () => {
  //region useState
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
    error: "",
    success: false,
  });
  //endregion

  const { name, email, password, checkPassword, success, error } = values;

  //region handleChange
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //endregion

  //region clickSubmit
  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    signup({ name, email, password }).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          checkPassword: "",
          error: "",
          success: true,
        });
      }
    });
  };
  //endregion

  if (values.success) {
    return <Redirect to="/signin" />;
  }

  //region singUpForm
  const signUpForm = () => (
    <div id="login-box">
      <div className="first">
        <h1>Sign up</h1>
        <form className="col s12" onSubmit={clickSubmit}>
          <div className="input-field col s6">
            <input
              id="name"
              onChange={handleChange("name")}
              type="text"
              value={name}
              required
              className="validate"
            />
            <label htmlFor="name">Name</label>
            <span className="helper-text" data-error="Name required" />
          </div>

          <div className="input-field col s6">
            <input
              id="email"
              onChange={handleChange("email")}
              type="email"
              value={email}
              className="validate"
              required
            />
            <label htmlFor="email">Email</label>
            <span className="helper-text" data-error="Incorrect email" />
          </div>

          <div className="input-field col s6">
            <input
              id="password"
              onChange={handleChange("password")}
              type="text"
              value={password}
              className="validate"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
              required
            />
            <span
              className="helper-text"
              data-error="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="input-field col s6">
            <label htmlFor="checkPassword">Confirm password</label>
            <input
              id="checkPassword"
              onChange={handleChange("checkPassword")}
              type="text"
              value={checkPassword}
              className="validate"
              pattern={password}
              required
            />
            <span
              className="helper-text"
              data-error="Please enter the same Password as above"
            />
          </div>

          <button type="submit" className="btn waves-effect waves-light">
            SIGN ME UP
          </button>
        </form>

        {showError()}
      </div>
      {/*region Social*/}
      <div className="second">
        {/*<span className="loginwith">Sign in with<br/>social network</span>*/}

        {/*<button className="social-signin facebook">Log in with facebook</button>*/}
        {/*<button className="social-signin twitter">Log in with Twitter</button>*/}
        {/*<button className="social-signin google">Log in with Google+</button>*/}
      </div>
      {/*<div className="or">OR</div>*/}
      {/* endregion*/}
    </div>
  );
  //endregion

  //region show Error
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  //endregion

  //region show Success
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );
  //endregion

  //region return
  return <>{signUpForm()}</>;
  //endregion
};

export default Signup;
