const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors    = require("cors")
const routes = require("./routes/routes")

mongoose.connect('mongodb://localhost:27017/board', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
},()=>{console.log("database connected")});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use("/app", routes);


app.listen(5000, () => console.log("server is running"));
