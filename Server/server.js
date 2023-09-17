const express = require("express");
const db = require("./db");
var cors = require("cors");
const app = express(); //create app

app.use(cors());

app.use(express.json()); //convert body to json
app.use(express.urlencoded({ extended: false }));

app.use("/v1/sections", require("./sections/routes"));
app.use("/v1/objectives", require("./objectives/routes"));
app.use("/v1/lines", require("./lines/routes"));

app.listen(3000, () => console.log("Server started on http://localhost:3000/"));
