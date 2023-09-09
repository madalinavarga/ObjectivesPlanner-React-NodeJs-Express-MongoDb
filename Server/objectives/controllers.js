const objective = require("./models");

const getAll = async (req, res) => {
  try {
    const objectives = await objective.find({});
    console.log(objectives);
    res.status(200).json(objectives);
  } catch (error) {
    console.log("error:", error);
    constres.json({ message: "There was an error getting all objectives" });
  }
};

module.exports = getAll;
