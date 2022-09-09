import { cleanup, render, screen } from "@testing-library/react";
import Home from "../Container/Home";
import { BrowserRouter as Router } from "react-router-dom";

describe("Home Page", () => {
  test("renders correct user's name", () => {
    render(
      <Router>
        <Home />)
      </Router>
    );
    expect(screen.getByLabelText(/tweet-txt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tweet-txt/i)).toContainHTML("Hi");
  });
});
