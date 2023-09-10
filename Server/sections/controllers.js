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

const create = async (req, res) => {
  try {
    const newSection = await section.create(req.body);
    res.status(200).json(newSection);
  } catch (error) {
    console.log("error:", error);
  }
};

const remove = async (req, res) => {
  console.log("remove 2222");
  try {
    const deletedSection = await section.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedSection);
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = {
  getAll,
  create,
  remove,
};
