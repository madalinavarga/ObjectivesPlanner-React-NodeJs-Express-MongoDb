const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objective = mongoose.model(
  "objectives",
  Schema({
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    links: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done", "Skip"],
    },
    position: {
      type: {
        x: Number,
        y: Number,
      },
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    sectionId: {
      type: String,
    }
  })
);

module.exports = objective;
