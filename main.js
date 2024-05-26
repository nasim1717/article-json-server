const customRouter = require("./router");
const express = require("express");
const jsonServer = require("./lib/jsonServer");
var cors = require("cors");

require("dotenv").config();

const app = express();

// Prevent CORS errors
app.use(cors({ credentials: true, origin: true }));
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// /!\ Bind the router db to the app
app.db = jsonServer.db;

app.use(express.json());

// CustomRoute Middleware to Handle Extra Routes
app.use("/", customRouter);

app.use(jsonServer);

// Error handle Middleware
app.use((err, req, res, _next) => {
  console.error(err); // Log the error details
  res.status(500).json({
    error: err.message,
  });
});

// Not Found Middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

module.exports = app;
