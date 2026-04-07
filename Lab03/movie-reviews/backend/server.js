const express = require("express");
const cors = require("cors");
const movies = require("./api/movies.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;
