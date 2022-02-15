import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("initial conditions", function () {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkBox = screen.getByRole("checkbox", { name: "Disable checkbox" });

  expect(checkBox).not.toBeChecked();

  expect(colorButton).not.toBeDisabled();
  expect(colorButton.textContent).toBe("Change to blue");
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("click events work", function () {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkBox = screen.getByRole("checkbox", { name: "Disable checkbox" });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton.textContent).toBe("Change to red");

  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked();
  expect(colorButton).not.toBeDisabled();
});
