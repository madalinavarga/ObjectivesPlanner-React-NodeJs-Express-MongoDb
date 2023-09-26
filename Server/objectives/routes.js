const express = require("express");
const router = express.Router();
const { getAllBySection, create, remove, getById } = require("./controllers");
const { auth } = require("../middleware/auth");

router.get("/", auth, getAllBySection);
router.get("/:id", auth, getById);
router.post("/", auth, create);
router.delete("/:id", auth, remove);

module.exports = router;
