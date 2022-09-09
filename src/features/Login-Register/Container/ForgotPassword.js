import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Style/ForgotPassword.css";
import { forgotPass } from "../Service/Login-Register";
import validator from "validator";

function ForgotPassword() {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errStyle, setErrStyle] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  const newPassword = (event) => {
    event.preventDefault();
    const payload = {
      newPassword: password,
      contact: contact,
    };
    forgotPass(userName, payload)
      .then((res) => {
        history.push({
          pathname: "/login",
        });
      })
      .catch((err) => {
        console.error("Forgot Password Not Successful", err);
      });
  };

  const goBackToLogin = () => {
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
      <div className="screen">
        <div className="screen__content">
          <form className="forgotPass" onSubmit={newPassword}>
            <div className="forgotPass-txt" aria-label="forgotPass-txt">
              Forgot Password
            </div>
            <div className="forgotPass__field">
              <i className="forgotPass__icon fas fa-user" data-testid="forgot-user-icon"></i>
              <input
                type="text"
                className="forgotPass__input"
                placeholder="User name / Email"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                data-testid="forgot-username-textfield"
              />
            </div>
            <div className="forgotPass__field">
              <i className="forgotPass__icon fas fa-thin fa-address-book" data-testid="forgot-contact-icon"></i>
              <input
                type="type"
                className="forgotPass__input"
                placeholder="Contact"
                value={contact}
                onChange={(e) => validateContact(e)}
                data-testid="forgot-contact-textfield"
              />
            </div>
            {contactMsg === "" || contact === "" ? null : (
              <span
                className={
                  errStyle === "green" ? "strongPassword" : "weakPassword"
                }
              >
                {contactMsg}
              </span>
            )}
            <div className="forgotPass__field">
              <i className="forgotPass__icon fas fa-lock" data-testid="forgot-lock-icon"></i>
              <input
                type="password"
                className="forgotPass__input"
                placeholder="New Password"
                value={password}
                onChange={(e) => validatePassword(e)}
                data-testid="forgot-new-password-textfield"
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
            <div className="forgotPass__field">
              <i className="forgotPass__icon fas fa-lock" data-testid="forgot-confirm-lock-icon"></i>
              <input
                type="password"
                className="forgotPass__input"
                placeholder="Confirm Pass"
                value={confirmPassword}
                onChange={(e) => validateConfirmPassword(e)}
                onFocus={() => setErrMsg("")}
                data-testid="forgot-confirm-password-textfield"
              />
            </div>
            {confirmMsg === "" || confirmPassword === "" ? null : (
              <span
                className={
                  errStyle === "green" ? "strongPassword" : "weakPassword"
                }
              >
                {confirmMsg}
              </span>
            )}
            <button className="button forgotPass__submit" type="submit">
              <span className="button__text" data-testid="forgot-submit-btn">Submit</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <button
              className="button forgotPass__submit"
              onClick={() => goBackToLogin()}
            >
              <span className="button__text" data-testid="forgot-login-btn">Back to Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background_forgotPass" data-testid="forgotPassword-Background">
          <span className="screen__background__shape_forgotPass screen__background__shape4_forgotPass"></span>
          <span className="screen__background__shape_forgotPass screen__background__shape3_forgotPass"></span>
          <span className="screen__background__shape_forgotPass screen__background__shape2_forgotPass"></span>
          <span className="screen__background__shape_forgotPass screen__background__shape1_forgotPass"></span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
