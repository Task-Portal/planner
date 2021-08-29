import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./singin.css";
import useScript from "../../hooks/useScript";
import { signin, authenticate, isAuthenticated } from "../../auth";

const Signin = () => {
  //region useState
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  //endregion
  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  //  useScript('./signinScript.js');

  //region handleChange
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //endregion

  //region clickSubmit
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };
  //endregion

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h4>Loading...</h4>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/user/boards" />;
    }

    if (isAuthenticated()) {
      return <Redirect to="/signup" />;
    }
  };

  //region singInForm
  const signInForm = () => (
    <div id="login-box">
      <div className="first">
        <h1>Sign in</h1>
        <form className="col s12" onSubmit={clickSubmit}>
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

          <button type="submit" className="btn waves-effect waves-light">
            SIGN ME UP
          </button>
        </form>
        {showLoading()}
        {showError()}
        {redirectUser()}
      </div>
      <div className="second">
        {/*<span className="loginwith">Sign in with<br/>social network</span>*/}

        {/*<button className="social-signin facebook">Log in with facebook</button>*/}
        {/*<button className="social-signin twitter">Log in with Twitter</button>*/}
        {/*<button className="social-signin google">Log in with Google+</button>*/}
      </div>
      {/*<div className="or">OR</div>*/}
    </div>
  );

  //region return
  return signInForm();
  //endregion
};

export default Signin;
