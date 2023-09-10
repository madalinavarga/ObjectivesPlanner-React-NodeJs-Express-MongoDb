const express = require("express");
const router = express.Router();
const { getAllBySection, create, remove } = require("./controllers");

router.get("/", getAllBySection);
router.post("/", create);
router.delete("/:id", remove);

module.exports = router;
