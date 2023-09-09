const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const line = mongoose.model(
  "lines",
  Schema({
    id: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  })
);

module.exports = line;
