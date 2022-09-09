import { render, screen } from "@testing-library/react";
import Login from "../Container/Login";
import { BrowserRouter as Router } from "react-router-dom";

describe("Tweets Page", () => {
  test("renders correct title", () => {
    render(
      <Router>
        <Login />)
      </Router>
    );
    expect(screen.getByLabelText(/login-txt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/login-txt/i)).toContainHTML("Login");
  });

  test("renders user and lock icon", () => {
    render(
      <Router>
        <Login />)
      </Router>
    );
    expect(screen.getByTestId(/user-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/lock-icon/i)).toBeInTheDocument();
  });

  test("renders username and password textfield", () => {
    render(
      <Router>
        <Login />)
      </Router>
    );
    expect(screen.getByTestId(/username-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password-textfield/i)).toBeInTheDocument();
  });

  test("renders forgot password link", () => {
    render(
      <Router>
        <Login />)
      </Router>
    );
    expect(screen.getByTestId(/forgotPass-Link/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgotPass-Link/i)).toHaveTextContent(
      "Forgot Password ?"
    );
  });

  test("renders register and login button", () => {
    render(
      <Router>
        <Login />)
      </Router>
    );
    expect(screen.getByTestId(/span-register-btn/i)).toHaveTextContent("Register");
    expect(screen.getByTestId(/span-login-btn/i)).toHaveTextContent("Log In Now");
  });

  test("renders all background", () => {
    render(
      <Router>
        <Login />)
      </Router>
    );
    expect(screen.getByTestId(/background/i)).toBeInTheDocument();
  });
});
