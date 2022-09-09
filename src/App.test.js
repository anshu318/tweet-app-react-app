import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

describe("App Page", () => {
  test("renders correct header logo", () => {
    render(
      <Router>
        <App />)
      </Router>
    );
  });
});