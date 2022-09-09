import { render, screen } from "@testing-library/react";
import Footer from "../Container/Footer";

describe("Footer Page", () => {
  test("renders correct text", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/All rights reserved/i);
    expect(footerElement).toBeInTheDocument();
    expect(screen.getByLabelText(/footer/i)).toBeInTheDocument();
  });
});
