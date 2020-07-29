const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//Middleware
app.use(cors());
app.use(express.json()); //=> req.body
//Routes//
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen((port = 5000), () => {
  console.log(`listening to ${port}`);
});
