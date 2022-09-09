import React, { useState } from "react";
import "../Style/Register.css";
import { useHistory } from "react-router-dom";
import { register } from "../Service/Login-Register";
import validator from "validator";
import ls from "local-storage";

function Register() {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errStyle, setErrStyle] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  const registerUser = (event) => {
    event.preventDefault();
    const payload = {
      username: userName,
      name: name,
      email: userName,
      contactNum: contact,
      password: password,
    };
    register(payload)
      .then((res) => {
        ls.set("username", res.data.username);
        ls.set("name", res.data.name);
        history.push({
          pathname: "/home",
          state: res.data,
        });
      })
      .catch((err) => {
        console.error("Register Not Succesful", err);
      });
  };

  const backToLogin = () => {
    history.push("/login");
  };

  const validatePassword = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setPassword(eventTarget.value);
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrMsg("Password is strong");
      setErrStyle("green");
    } else {
      setErrMsg("Password is not strong");
      setErrStyle("red");
    }
  };

  const validateConfirmPassword = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setConfirmPassword(eventTarget.value);
    const confirm = eventTarget.value;
    if (password === confirm) {
      setConfirmMsg("");
    } else {
      setConfirmMsg("Confirm Password not Matching");
    }
  };

  const validateContact = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setContact(eventTarget.value);
    const contact = eventTarget.value.length;
    if (contact === 10) {
      setContactMsg("");
    } else {
      setContactMsg("Contact should be of 10 digit");
    }
  };

  return (
    <div className="container">
      <div className="screen_register">
        <div className="screen__content_register">
          <form className="register" onSubmit={registerUser}>
            <div className="register-txt" aria-label="register-txt">
              Register
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-user" data-testid="user-icon"></i>
              <input
                type="text"
                className="register__input"
                placeholder="First Last"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="register-name-textfield"
              />
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-envelope" data-testid="email-icon"></i>
              <input
                type="text"
                className="register__input"
                placeholder="User name / Email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                data-testid="register-username-textfield"
              />
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-lock" data-testid="register-lock-icon"></i>
              <input
                type="password"
                className="register__input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  validatePassword(e);
                }}
                data-testid="register-password-textfield"
              />
            </div>
            {errMsg === "" || password === "" ? null : (
              <span
                className={
                  errStyle === "green" ? "strongPassword" : "weakPassword"
                }
              >
                {errMsg}
              </span>
            )}
            <div className="register__field">
              <i className="register__icon fas fa-lock" data-testid="confirm-lock-icon"></i>
              <input
                type="password"
                className="register__input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => validateConfirmPassword(e)}
                onFocus={() => setErrMsg("")}
                data-testid="confirm-password-textfield"
              />
            </div>
            {confirmMsg === "" || confirmPassword === "" ? null : (
              <span className={"weakPassword"}>{confirmMsg}</span>
            )}
            <div className="register__field">
              <i className="register__icon fas fa-thin fa-address-book" data-testid="contact-icon"></i>
              <input
                type="text"
                className="register__input"
                placeholder="Contact"
                value={contact}
                onChange={(e) => validateContact(e)}
                data-testid="contact-textfield"
              />
            </div>
            {contactMsg === "" || contact === "" ? null : (
              <span className={"weakPassword"}>{contactMsg}</span>
            )}
            <button
              className="button register__submit"
              disabled={
                name === "" ||
                userName === "" ||
                password === "" ||
                confirmPassword === "" ||
                contact === ""
                  ? true
                  : false
              }
              type="submit"
            >
              <span className="button__text" data-testid="rspan-register-btn">Register</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <button
              className="button register__submit"
              onClick={() => backToLogin()}
            >
              <span className="button__text" data-testid="res-span-login-btn">Back To Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background_register" data-testid="register-background">
          <span className="screen__background__shape_register screen__background__shape4_register"></span>
          <span className="screen__background__shape_register screen__background__shape3_register"></span>
          <span className="screen__background__shape_register screen__background__shape2_register"></span>
          <span className="screen__background__shape_register screen__background__shape1_register"></span>
        </div>
      </div>
    </div>
  );
}

export default Register;
