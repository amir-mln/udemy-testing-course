import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays images for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  const imagesAlts = scoopImages.map((image) => image.alt);

  expect(scoopImages).toHaveLength(2);
  expect(imagesAlts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays images for each topping options from server", async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole("img", { name: /topping$/i });
  const imagesAlts = images.map((img) => img.alt);

  expect(images).toHaveLength(3);
  expect(imagesAlts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
