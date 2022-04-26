import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("displays images for each scoop option from server", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  const imagesAlts = scoopImages.map((image) => image.alt);

  expect(scoopImages).toHaveLength(2);
  expect(imagesAlts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays images for each topping options from server", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const images = await screen.findAllByRole("img", { name: /topping$/i });
  const imagesAlts = images.map((img) => img.alt);

  expect(images).toHaveLength(3);
  expect(imagesAlts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});

test("update scoop subtotal when scoop change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings are checked", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingsSubtotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).not.toBeChecked();
  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.5");
});
