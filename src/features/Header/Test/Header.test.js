import { render, screen } from "@testing-library/react";
import Header from "../Container/Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header Page", () => {
  test("renders correct header logo", () => {
    render(
      <Router>
        <Header />)
      </Router>
    );
    expect(screen.getByLabelText(/header-title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/header-title/i)).toContainHTML("Tweet-App");
  });

  test("renders correct home tab", () => {
    render(
      <Router>
        <Header />)
      </Router>
    );
    expect(screen.getByTestId(/home/i)).toBeInTheDocument();
    expect(screen.getByTestId(/home/i)).toContainHTML("Home");
  });

  test("renders correct tweet tab", () => {
    render(
      <Router>
        <Header />)
      </Router>
    );
    expect(screen.getByTestId(/tweet/i)).toBeInTheDocument();
    expect(screen.getByTestId(/tweet/i)).toContainHTML("Tweet");
  });

  test("renders correct user tab", () => {
    render(
      <Router>
        <Header />)
      </Router>
    );
    expect(screen.getByTestId(/user/i)).toBeInTheDocument();
    expect(screen.getByTestId(/user/i)).toContainHTML("Users");
  });

  test("renders correct log-out tab", () => {
    render(
      <Router>
        <Header />)
      </Router>
    );
    expect(screen.getByTestId(/log-out/i)).toBeInTheDocument();
    expect(screen.getByTestId(/log-out/i)).toContainHTML("LogOut");
  });
});
