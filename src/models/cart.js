require("../config/db");
const mongoose = require("mongoose");

const { Schema, Model } = mongoose;

const CartSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  cartBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books"
    }
  ]
});

const Cart = Model("cart", CartSchema);
