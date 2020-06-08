"use strict";

const express = require("express");
const morgan = require("morgan");
const { users } = require("./data/users");
let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

// const q1 = (req, res) => {
//   res.render("pages/homepage", { users });
// };
const handleHomepage = (req, res) => {
  res.status(200).send("homepage");
};
// -----------------------------------------------------
// server endpoints
const PORT = process.env.PORT || 8000;
express()
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints

  // a catchall endpoint that will send the 404 message.
  .get("/", handleHomepage)
  .get("*", handleFourOhFour)

  .listen(8000, () => console.log(`Listening on port ${PORT} `));
