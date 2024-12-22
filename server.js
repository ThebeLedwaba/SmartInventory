// server.js
const express = require("express");
require('dotenv').config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//const inventoryRoutes = require("./routes/inventory");

//app.use("/api/inventory", inventoryRoutes);
const path = require("path");

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));
