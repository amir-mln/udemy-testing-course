import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

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
  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
