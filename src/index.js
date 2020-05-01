const express = require("express");
const booksRouter = require("./routes/booksRouter");
const loginRouter = require("./routes/loginRouter");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/books", booksRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("from the server");
});

app.listen(3000, () => {
  console.log("server is up");
});
