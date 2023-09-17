const objective = require("./models");

const getAllBySection = async (req, res) => {
  try {
    const objectives = await objective.find({
      sectionId: req.query.sectionId,
    });
    res.status(200).json(objectives);
  } catch (error) {
    console.log("error:", error);
  }
};

const getById = async (req, res) => {
  try {
    const objectiveResponse = await objective.findById(req.params.id);
    res.status(200).json(objectiveResponse);
  } catch (error) {
    console.log("error:", error);
  }
};

const create = async (req, res) => {
  try {
    const newObjective = await objective.create(req.body);
    res.status(200).json(newObjective);
  } catch (error) {
    console.log("error:", error);
  }
};

const remove = async (req, res) => {
  try {
    const deletedObjective = await objective.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedObjective);
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = {
  getAllBySection,
  getById,
  create,
  remove,
};
