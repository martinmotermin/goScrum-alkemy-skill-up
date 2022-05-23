import { render, screen } from "@testing-library/react";
import { Donate } from "./Donate";

it("renderiza un heading?", () => {
  render(<Donate />);

  expect(screen.getByRole("heading")).toBeInTheDocument();
});

it("renderiza un link?", () => {
  render(<Donate />);

  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "https://mpago.la/1Wje4Cc"
  );
});

it("redirige a otra pestaña?", () => {
  render(<Donate />);

  expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
});
