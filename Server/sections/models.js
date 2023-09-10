const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const section = mongoose.model(
  "sections",
  Schema({
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  })
);

module.exports = section;
