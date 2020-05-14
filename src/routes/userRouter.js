const express = require("express");
const User = require("../models/users");

const userRouter = express.Router();

//Api for user Details
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  //verify presence of token in cookie.
  try {
    const userDetails = await User.findById(id)
      .populate({
        path: "borrowedBooks"
      })
      .populate({ path: "cart" });
    if (userDetails) {
      console.log(userDetails);
      res.send(userDetails);
    } else {
      res.send("unauthorized");
    }
  } catch (e) {
    console.error(e);
    res.send("something went wrong");
  }
});

module.exports = userRouter;
