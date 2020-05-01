require("../config/db");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  author: {
    type: String
  },
  borrowers: {
    type: Array
  }
});

const Books = model("Books", BookSchema);

module.exports = Books;
