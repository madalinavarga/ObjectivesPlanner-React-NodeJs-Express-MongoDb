const line = require("./models");

const getAll = async (req, res) => {
  try {
    const lines = await line.find({});
    console.log(lines);
    res.status(200).json(lines);
  } catch (error) {
    console.log("error:", error);
    res.json({ message: "There was an error getting all lines" });
  }
};

module.exports = getAll;
