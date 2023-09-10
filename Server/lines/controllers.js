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

const create = async (req, res) => {
  try {
    const newLine = await line.create(req.body);
    res.status(200).json(newLine);
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = { getAll, create };
