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

module.exports = getAllBySection;
