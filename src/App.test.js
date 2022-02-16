import { render, screen, fireEvent } from "@testing-library/react";
import App, { separateWithSpace } from "./App";

describe("testing the button and checkbox", function () {
  test("initial conditions", function () {
    render(<App />);

    const colorButton = screen.getByRole("button", {
      name: "Change to Midnight Blue",
    });
    const checkBox = screen.getByRole("checkbox", { name: "Disable checkbox" });

    expect(checkBox).not.toBeChecked();

    expect(colorButton).not.toBeDisabled();
    expect(colorButton.textContent).toBe("Change to Midnight Blue");
    expect(colorButton).toHaveStyle({
      backgroundColor: "MediumVioletRed",
    });
  });

  test("click events work", function () {
    render(<App />);
    const colorButton = screen.getByRole("button", {
      name: "Change to Midnight Blue",
    });
    const checkBox = screen.getByRole("checkbox", { name: "Disable checkbox" });

    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({
      backgroundColor: "MidnightBlue",
    });
    expect(colorButton.textContent).toBe("Change to Medium Violet Red");

    fireEvent.click(checkBox);
    expect(checkBox).toBeChecked();
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

    fireEvent.click(checkBox);
    expect(checkBox).not.toBeChecked();
    expect(colorButton).not.toBeDisabled();
  });
});

describe("unit testing 'separateWithSpace' function", function () {
  test("Works for on inner capital letters", function () {
    expect(separateWithSpace("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", function () {
    expect(separateWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", function () {
    expect(separateWithSpace("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
