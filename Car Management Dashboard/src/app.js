const express = require("express");
require("dotenv").config();

const api = require("../routes/api");

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json()); // body json
app.use(express.urlencoded({ extended: true })); // body urlencoded

app.use("/api/cars", api.cars());

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
