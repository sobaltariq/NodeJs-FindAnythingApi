const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./api/router/userRouter");

// for env
require("dotenv").config();

const app = express();

mongoose
  .connect("mongodb://localhost:27017/findAnything")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// to use json data (post request data) it display data from body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "app is running",
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: "Invalid Route",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

// npm run dev
// npm i mongoose
// npm i body-parser
// npm i bcrypt
// npm i jsonwebtoken
// npm i dotenv
// npm i multer
// npm i nodemailer
// npm i express-session
// npm i randomstring

// npm i express mongoose body-parser bcrypt jsonwebtoken nodemon
