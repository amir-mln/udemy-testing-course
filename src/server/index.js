const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/scoops", (req, res) => {
  res.json([
    { name: "Chocolate", imagePath: "/images/chocolate.png" },
    { name: "Vanilla", imagePath: "/images/vanilla.png" }
  ]);
});

app.get("/toppings", (_, res) =>
  res.json([
    { name: "Cherries", imagePath: "/images/cherries.png" },
    { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
    { name: "Hot fudge", imagePath: "/images/hot-fudge.png" }
  ])
);

app.post("/order", (_res, res) =>
  res.json({ orderNumber: (Math.random() * 100).toFixed(0) })
);

app.listen(3030);
