require("../config/db");
const User=require('../models/users');

const newUser = new User({
  email: "myuser@test.com"
});

//newUser.save().then(console.log);

const clearUsers = () => {
  User.deleteMany({})
    .then(console.log)
    .catch(console.error);
};

clearUsers();