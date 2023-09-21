const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const register = mongoose.model(
  "users",
  Schema({
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    }
  })
);

module.exports = register;
