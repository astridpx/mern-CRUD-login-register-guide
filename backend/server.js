// This script handle the connection of the MongoDB Atlas and our application

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// import the rooutes folder
const personRouter = require("./routes/account");

const accountRouter = require("./routes/acc");
const authRouter = require("./routes/auth");

require("dotenv").config();

// declare app as express
const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());

// mongodb connection script
// this will create the connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MonggoDB Atlas Connection is Established");
});

// listen to the port
app.listen(port, () => {
  console.log(`Server established at port ${port}`);
});

// Supply the Routse
// suppply the {account} < it is use for testing of sendig or getting data in thunder client>
// link for adding and accountRouter that we import
app.use("/account", accountRouter);
app.use("/login", authRouter);
app.use("/person", personRouter);
