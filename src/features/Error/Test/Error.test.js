import { render, screen } from "@testing-library/react";
import Error from "../Container/Error";

describe("Error Page", () => {
  test("renders correct alt", () => {
    render(<Error />);
    const imgElement = screen.getByRole("img");
    expect(imgElement.alt).toContain("Error");
  });
});
