const express = require("express");
const books = require("../models/books");
const User = require("../models/users");
const bookRouter = express.Router();
const { userTokenValidator } = require("../utils/jwtTokenManager");

bookRouter.get("/", async (req, res) => {
  const jwtToken = req.headers.authorization;
  console.log(jwtToken);

  if (userTokenValidator(jwtToken)) {
    const bookdata = await books.find({});
    res.status(200).send({status:'success', books: bookdata });
  } else {
    res.status(400).send({ status: "unauthorized" });
  }
});

bookRouter.get("/borrow/:userId/:bookId/", async (req, res) => {
  const jwtToken = req.headers("Authorization");
  console.log(jwtToken);
  const { userId, bookId } = req.params;
  let updatedBorrowers;
  try {
    const { borrowers } = await books.findById(bookId);
    if (borrowers > 0) {
      updatedBorrowers = borrowers - 1;
      const result = await books.updateOne(
        { _id: bookId },
        { borrowers: updatedBorrowers }
      );
      if (result.n) {
        console.log(userId);

        const sample = await User.findById(userId);
        const updatedBorrowedBooks = [...sample.borrowedBooks, bookId];
        console.log(updatedBorrowedBooks);

        const userResult = await User.updateOne(
          { _id: userId },
          { $push: { borrowedBooks: bookId } }
        );
        if (userResult.n) {
          const { cart } = await User.findById(userId);
          const newCart = cart.filter(c => c.toString() !== bookId);
          console.log(newCart);
          const cartResult = await User.updateOne(
            { _id: userId },
            { cart: newCart }
          );
          if (cartResult.n) {
            console.log("updated user profile");
            res.send({ status: "success" });
          } else {
            res.send({ status: "something went wrong" });
          }
        } else {
          res.send({ status: "something went wrong" });
        }
      }
    } else {
      res.send({
        status: "Selected Book currently unaivalable , please try other Books"
      });
    }

    // const updatedBorrowers = borrowers.map((borr, index) => {
    //   if (index === Number(borrowerId)) {
    //     return { name: borr.name, available: false };
    //   } else return borr;
    // });
  } catch (e) {
    console.error(e);
    res.send({ status: "something went wrong" });
  }
});

bookRouter.get("/return/:userId/:bookId/", async (req, res) => {
  const { userId, bookId } = req.params;
  let updatedBorrowers;
  try {
    const { borrowers } = await books.findById(bookId);

    updatedBorrowers = borrowers + 1;
    const result = await books.updateOne(
      { _id: bookId },
      { borrowers: updatedBorrowers }
    );
    if (result.n) {
      //console.log(userId);

      const { borrowedBooks } = await User.findById(userId);
      console.log("actual", borrowedBooks);
      const updatedBorrowedBooks = borrowedBooks.filter(
        book => book.toString() !== bookId
      );
      console.log("updated", updatedBorrowedBooks);

      const userResult = await User.updateOne(
        { _id: userId },
        { borrowedBooks: updatedBorrowedBooks }
      );
      if (userResult.n) {
        //console.log("updated user profile");
        res.send({ status: "success" });
      } else {
        res.send({ status: "something went wrong" });
      }
    }
  } catch (e) {
    console.error(e);
  }
});

bookRouter.get("/addToCart/:userId/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;
  const result = await User.updateOne(
    { _id: userId },
    { $push: { cart: bookId } }
  );
  if (result.n) {
    console.log(result);
    res.send({ status: "success" });
  } else {
    res.send({ status: "something went wrong" });
  }
});

bookRouter.get("/cartBooks/:userId", async (req, res) => {
  const { userId } = req.params;
  const result = await User.findById({ userId });
});

module.exports = bookRouter;
