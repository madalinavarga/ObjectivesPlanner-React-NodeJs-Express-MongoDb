const section = require("./models");

const getAll = async (req, res) => {
  try {
    const sections = await section.find({});
    console.log(sections);
    res.status(200).json(sections);
  } catch (error) {
    console.log("error: ", error);
    res.json({ message: "There was an error getting all sections" });
  }
};

module.exports = getAll;
