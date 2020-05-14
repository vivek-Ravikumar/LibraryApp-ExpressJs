const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "Library"
  });
};
dbConnect();

const db = mongoose.connection;

db.on("error", error => {
  console.log("MongoDB Connection error");
  console.error(error);
});
db.once("open", function() {
  // we're connected!
  console.log("db connected");
});

module.exports = db;
