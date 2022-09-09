import { render, screen } from "@testing-library/react";
import Tweets from "../Container/Tweets";
import { BrowserRouter as Router } from "react-router-dom";

describe("Tweets Page", () => {
  test("renders correct title", () => {
    render(
      <Router>
        <Tweets />)
      </Router>
    );
    expect(screen.getByLabelText(/tweet-txt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tweet-txt/i)).toContainHTML("Tweets");
  });
});
