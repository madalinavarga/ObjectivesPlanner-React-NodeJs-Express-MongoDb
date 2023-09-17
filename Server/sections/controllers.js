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

const getByFilter = async (req, res) => {
  try {
    const filter = req.query.name;
    if (filter) {
      const sections = await section.find({ name: { $regex: filter, $options: "i" } });
      console.log(sections);
      res.status(200).json(sections);
      return;
    }
    const sections = await section.find();
    console.log(sections);
    res.status(200).json(sections);
  } catch (error) {
    console.log("error: ", error);
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
  try {
    const deletedSection = await section.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedSection);
  } catch (error) {
    console.log("error:", error);
  }
};

const update = async (req, res) => {
  try {
    const updatedSection = await section.findOneAndUpdate(req.body);
    res.status(200).json(updatedSection);
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  getByFilter,
};
