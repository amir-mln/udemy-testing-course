import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays images for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  const imagesAlts = scoopImages.map((image) => image.alt);

  expect(scoopImages).toHaveLength(2);
  expect(imagesAlts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
