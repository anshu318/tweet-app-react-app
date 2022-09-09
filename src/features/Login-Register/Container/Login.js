import { Link } from "@material-ui/core";
import React, { useState } from "react";
import "../Style/Login.css";
import { useHistory } from "react-router-dom";
import { login } from "../Service/Login-Register";
import ls from "local-storage";

function Login() {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const registerUser = () => {
    history.push("/register");
  };

  const loginUser = (event) => {
    event.preventDefault();
    login(userName, password)
      .then((res) => {
        ls.set("username", res.data.username);
        ls.set("name", res.data.name);
        history.push({
          pathname: "/home",
          state: res.data,
        });
      })
      .catch((err) => {
        console.error("Login Not Successful", err.response.data);
        setErr(err.response.data.response);
      });
  };

  const forgotPassword = () => {
    history.push("/forgotPass");
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={loginUser}>
            <div className="login-txt" aria-label="login-txt">
              Login
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user" data-testid="user-icon"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                data-testid="username-textfield"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock" data-testid="lock-icon"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="password-textfield"
              />
            </div>

            <Link
              className="login__field_forgot"
              style={{ textDecoration: "none", color: "#6058A3" }}
              onClick={() => forgotPassword()}
              data-testid="forgotPass-Link"
            >
              Forgot Password ?
            </Link>

            {err === "" ? null : <div className={"wrongCredential"}>{err}</div>}
            <button
              className="button login__submit"
              onClick={() => registerUser()}
            >
              <span className="button__text" data-testid="span-register-btn">Register</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <button
              className="button login__submit"
              disabled={userName === "" || password === "" ? true : false}
              type="submit"
            >
              <span className="button__text" data-testid="span-login-btn">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background" data-testid="background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
