import { render, screen } from "@testing-library/react";
import Register from "../Container/Register";
import { BrowserRouter as Router } from "react-router-dom";

describe("Tweets Page", () => {
  test("renders correct title", () => {
    render(
      <Router>
        <Register />)
      </Router>
    );
    expect(screen.getByLabelText(/register-txt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register-txt/i)).toContainHTML("Register");
  });

  test("renders all icons on textfield", () => {
    render(
      <Router>
        <Register />)
      </Router>
    );
    expect(screen.getByTestId(/user-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/register-lock-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/email-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/confirm-lock-icon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/contact-icon/i)).toBeInTheDocument();
  });

  test("renders all textfield", () => {
    render(
      <Router>
        <Register />)
      </Router>
    );
    expect(screen.getByTestId(/register-name-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/register-username-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/register-password-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/confirm-password-textfield/i)).toBeInTheDocument();
    expect(screen.getByTestId(/contact-textfield/i)).toBeInTheDocument();
  });

  test("renders all buttons", () => {
    render(
      <Router>
        <Register />)
      </Router>
    );
    expect(screen.getByTestId(/rspan-register-btn/i)).toHaveTextContent("Register");
    expect(screen.getByTestId(/res-span-login-btn/i)).toHaveTextContent("Back To Login");
  });

  test("renders all background", () => {
    render(
      <Router>
        <Register />)
      </Router>
    );
    expect(screen.getByTestId(/register-background/i)).toBeInTheDocument();
  });
});