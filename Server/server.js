const express = require("express");
const db = require("./db");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express(); //create app
app.use(cookieParser());

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); //convert body to json
app.use(express.urlencoded({ extended: false }));

app.use("/v1/sections", require("./sections/routes"));
app.use("/v1/objectives", require("./objectives/routes"));
app.use("/v1/lines", require("./lines/routes"));
app.use("/v1/auth", require("./auth/routes"));

app.listen(3000, () => console.log("Server started on http://localhost:3000/"));
