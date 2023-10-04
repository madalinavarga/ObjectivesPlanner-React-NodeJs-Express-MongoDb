const section = require("./models");
const Page_Size = 5;

const getAll = async (req, res) => {
  try {
    const sections = await section.find({});
    res.status(200).json(sections);
  } catch (error) {
    console.log("error: ", error);
    res.json({ message: "There was an error getting all sections" });
  }
};

const getByFilter = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const filter = req.query.name;
    const totalSections = await section.countDocuments();
    const totalPages = Math.ceil(totalSections / Page_Size);

    if (filter) {
      const sections = await section.find({ name: { $regex: filter, $options: "i" } });
      console.log(sections);
      res.status(200).json(sections);
      return;
    }

    const sections = await section
      .find({})
      .skip((page - 1) * Page_Size)
      .limit(Page_Size);

    res.status(200).json({sections,totalPages});
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
    res.status(500);
  }
};

const remove = async (req, res) => {
  try {
    const deletedSection = await section.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedSection);
  } catch (error) {
    console.log("error:", error);
    res.status(500);
  }
};

const update = async (req, res) => {
  try {
    const updatedSection = await section.updateOne({ _id: req.body._id }, { name: req.body.name });
    res.status(200).json(updatedSection);
  } catch (error) {
    console.log("error:", error);
    res.status(500);
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  getByFilter,
};
