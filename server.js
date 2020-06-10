"use strict";

const express = require("express");
const morgan = require("morgan");
const { users } = require("./data/users");
let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const q1 = (req, res) => {
  res.status(200).render("pages/homepage", { users });
};

const q2 = (req, res) => {
  let user_id = req.params.user_id;
  if (user_id < users[0]._id || user_id > users[users.length - 1]._id) {
    res.status(404).send("User id does not exist.");
  }
  let currentUserFriends = [];
  users.forEach(function (user) {
    if (user_id == user._id) {
      currentUser = user;
    }
  });
  users.forEach(function (friend) {
    currentUser.friends.forEach(function (currentUserFriend) {
      if (currentUserFriend == friend._id) {
        currentUserFriends.push(friend);
      }
    });
  });

  res.status(200).render("pages/profile", { currentUser, currentUserFriends });
};

const handleSign = (req, res) => {
  res.render("pages/signin");
};

const handleName = (req, res) => {
  let firstName = req.query.firstName;
  if (findUser(firstName)._id) {
    let user = findUser(firstName);
    console.log("have a user: ", user);
    res.redirect(`/homepage/${user._id}`);
  } else {
    console.log("do not have a user");
    res.redirect("/signin");
  }
};

function findUser(userName) {
  let userFound = {};
  users.forEach(function (user) {
    if (userName == user.name) {
      userFound = user;
    }
  });
  return userFound; // The function returns the product of p1 and p2
}

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
  .get("/signin", handleSign)
  .get("/getName", handleName)
  .get("/homepage", q1)
  .get("/homepage/:user_id", q2)
  .get("*", handleFourOhFour)

  .listen(8000, () => console.log(`Listening on port ${PORT} `));
