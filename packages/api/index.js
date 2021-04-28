const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("I am John Doe!!");
});

// listen
app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
