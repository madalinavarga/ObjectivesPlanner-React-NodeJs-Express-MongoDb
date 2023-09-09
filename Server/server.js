const express = require("express");
const db = require("./db");

const app = express(); //create app

app.use(express.json()); //convert body to json
app.use(express.urlencoded({ extended: false }));

//endpoints
app.use("/api/home", (req, res) => {
  res.send("Welcome to the home page");
});

app.listen(3000, () => console.log("Server started on http://localhost:3000/"));
