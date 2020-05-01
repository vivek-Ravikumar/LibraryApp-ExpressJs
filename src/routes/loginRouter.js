const express = require("express");
const User = require("../models/users");
const loginRouter = express.Router();
const { generateHashSynch, compareHash } = require("../utils/hash");

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
        res.send({status:"success"});
      } else {
        res.send({ status: "incorrect password" });
      }
    } else {
      res.send({ status: "invalid user" });
    }
  })
  .post("/signup", (req, res) => {
    const userDetails = req.body;
    try {
      const newUser = new User({
        email: userDetails.email,
        passwordHash: generateHashSynch(userDetails.password)
      });
      newUser.save().then(console.log);
      res.send({ status: "success" });
    } catch (e) {
      console.error(e);
      res.send({ status: "something went wrong" });
    }
  });

module.exports = loginRouter;
