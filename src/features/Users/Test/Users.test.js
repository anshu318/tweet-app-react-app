import { render, screen } from "@testing-library/react";
import Users from "../Container/Users";
import { BrowserRouter as Router } from "react-router-dom";

describe("Users Page", () => {
  test("renders correct title", () => {
    render(
      <Router>
        <Users />)
      </Router>
    );
    expect(screen.getByLabelText(/user-txt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user-txt/i)).toContainHTML("Users List");
  });
});
