require("../config/db");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const User = model("Users", UserSchema);

// const newUser = new User({
//   email: "myuser@test.com"
// });

// newUser.save().then(console.log);

// const clearUsers = () => {
//   User.remove({})
//     .then(console.log)
//     .catch(console.error);
// };

// clearUsers();
module.exports = User;
