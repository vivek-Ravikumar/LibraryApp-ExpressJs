require("../config/db");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  borrowedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books"
    }
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books"
    }
  ]
});

const User = model("Users", UserSchema);

module.exports = User;
