import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

test("renders button with text", () => {
  const { getByText } = render(<Button>Click Me</Button>);
  expect(getByText("Click Me")).toBeInTheDocument();
});

test("calls onClick when clicked", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);
  fireEvent.click(getByText("Click Me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
