import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (_, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (_, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$0.00/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    expect(grandTotal).toHaveTextContent("$0.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$0.00/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$0.00/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(cherriesCheckbox);
    userEvent.type(vanillaInput, "0");
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
