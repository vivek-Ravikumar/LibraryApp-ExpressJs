const express = require("express");
const User = require("../models/users");
const loginRouter = express.Router();
const { generateHashSynch, compareHash } = require("../utils/hash");
const {
  userTokenGenerator,
  userTokenValidator
} = require("../utils/jwtTokenManager");

loginRouter
  .get("/", (req, res) => {
    res.send("from login ROuter");
  })
  .post("/", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const result = await compareHash(password, user.passwordHash);
      if (result) {
        const token = userTokenGenerator(email);
        res.cookie("jwt", token);
        res.send({ status: "success", jwt: token, userData: user });
      } else {
        res.send({ status: "incorrect password" });
      }
    } else {
      res.send({ status: "invalid user" });
    }
  })
  .post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const dupUser = await User.findOne({ email });
      if (dupUser) {
        res.send({ status: "Email already Registered" });
      } else {
        const newUser = new User({
          name,
          email,
          passwordHash: generateHashSynch(password),
          borrowedBooks: []
        });
        newUser.save().then(console.log);
        res.send({ status: "success" });
      }
    } catch (e) {
      console.error(e);
      res.send({ status: "something went wrong" });
    }
  });

module.exports = loginRouter;
