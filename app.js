const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({
  path: "/Users/tkolaric/Documents/ToniGit/NodeJs API/.env",
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${process.env.MONGO_LINK}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // TO DO - here set domain to allow CORS
  // change '*' to your domain, for example: 'http://my-page.com'

  res.header("Access-Control-Allow-Origin", process.env.WEB_PAGE_LINK);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// -------- ROUTES FOR METHODS HANDLING -------- //

app.use("/debts", require("./api/routes/debts"));
app.use("/users", require("./api/routes/users"));
app.use("/ping", require("./api/routes/ping"));

// --------------------------------------------- //

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
