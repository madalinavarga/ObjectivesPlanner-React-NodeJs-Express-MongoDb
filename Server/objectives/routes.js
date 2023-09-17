const express = require("express");
const router = express.Router();
const { getAllBySection, create, remove, getById } = require("./controllers");

router.get("/", getAllBySection);
router.get("/:id", getById);
router.post("/", create);
router.delete("/:id", remove);

module.exports = router;
