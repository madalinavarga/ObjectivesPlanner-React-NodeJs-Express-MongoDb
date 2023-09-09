// Import the mongoose module
const mongoose = require("mongoose");
// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/my_database";
// Connect to the database.
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get the default connection.
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors).
db.on("error", console.error.bind(console, "MongoDB connection error:"));


module.exports = db;
