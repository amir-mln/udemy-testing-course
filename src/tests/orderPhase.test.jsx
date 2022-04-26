import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for the happy path", async () => {
  render(<App />);

  // add ice cream scoops and toppings

  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "1");

  const vanillaScoop = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "1");

  const cherriesToppings = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesToppings);

  const MnMsToppings = screen.getByRole("checkbox", { name: "M&Ms" });
  userEvent.click(MnMsToppings);

  const hotFudgeToppings = screen.getByRole("checkbox", { name: "Hot Fudge" });
  userEvent.click(hotFudgeToppings);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /Order Sundae!/i });
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $4.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("1 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();
  expect(screen.getByText("M&Ms")).toBeInTheDocument();
  expect(screen.getByText("Hot Fudge")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const conditionsCheckBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(conditionsCheckBox);

  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmBtn);

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNum = await screen.findByText(/order number/i);
  expect(orderNum).toBeInTheDocument();

  // click the "new order" button
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderBtn);

  // check that scoops and toppings subtotal have been reset
  const scoopSubTotal = screen.getByText("Scoops total: $0.00");
  const toppingsSubTotal = screen.getByText("Toppings total: $0.00");

  expect(scoopSubTotal).toBeInTheDocument();
  expect(toppingsSubTotal).toBeInTheDocument();

  // since these two elements are committed to dom after a fetch request, we have to
  // wait for them so the Testing Library doesn't throw errors
  await screen.findByRole("spinbutton", { name: "Chocolate" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
