const express = require("express");
const books = require("../models/books");

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  //res.send("from books router");

  const bookdata = await books.find({});
  res.status(200).send({ books: bookdata });
});

module.exports = bookRouter;
