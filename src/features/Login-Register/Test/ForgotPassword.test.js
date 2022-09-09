import { render, screen } from "@testing-library/react";
import ForgotPassword from "../Container/ForgotPassword";
import { BrowserRouter as Router } from "react-router-dom";

describe("Tweets Page", () => {
  test("renders correct title", () => {
    render(
      <Router>
        <ForgotPassword />)
      </Router>
    );
    expect(screen.getByLabelText(/forgotPass-txt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forgotPass-txt/i)).toContainHTML(
      "Forgot Password"
    );
  });

  test("renders all icons on textfield", () => {
    render(
      <Router>
        <ForgotPassword />)
      </Router>
    );
    expect(screen.getByTestId(/forgot-user-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgot-contact-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgot-lock-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgot-confirm-lock-icon/i)).toBeInTheDocument();
  });

  test("renders all textfield", () => {
    render(
      <Router>
        <ForgotPassword />)
      </Router>
    );
    expect(screen.getByTestId(/forgot-username-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgot-contact-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgot-new-password-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/forgot-confirm-password-textfield/i)).toBeInTheDocument();
  });

  test("renders all buttons", () => {
    render(
      <Router>
        <ForgotPassword />)
      </Router>
    );
    expect(screen.getByTestId(/forgot-submit-btn/i)).toHaveTextContent("Submit");
    expect(screen.getByTestId(/forgot-login-btn/i)).toHaveTextContent("Back to Login");
  });

  test("renders all background", () => {
    render(
      <Router>
        <ForgotPassword />)
      </Router>
    );
    expect(screen.getByTestId(/forgotPassword-Background/i)).toBeInTheDocument();
  });
});
