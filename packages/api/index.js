require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT =  process.env.PORT || 4000;
//middlewares
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.URI;
  
// connecting to server
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB CONNECTED!!!!!!!!!!!"))
  .catch((err) => console.log(err));

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
app.use("/api", videoRoutes);
app.use("/api", userRoutes);

// listen
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port : ${PORT}`);
});
