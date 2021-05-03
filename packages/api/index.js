const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

const uri =
  "mongodb+srv://admin_manish:manish1408@cluster0.r7gze.mongodb.net/glitchStream?retryWrites=true&w=majority";

// connecting to server
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("DB CONNECTED!!!!!!!!!!!"))
  .catch(err => console.log(err));

// middlewares
app.use(bodyParser.json());
app.use(cors());

// default page
app.get("/", (req, res) => {
  res.send("I am John Doe!!");
});

// routes
const videoRoutes = require("./Video/route");
const userRoutes = require("./Users/route");

// API
app.use("/api",videoRoutes);
app.use("/api",userRoutes);

// listen
app.listen(4000, (req, res) => {
  console.log("Server is running on port 4000");
});
