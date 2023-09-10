const express = require("express");
const router = express.Router();
const { getAll, create, remove } = require("./controllers");

router.get("/", getAll);
router.post("/", create);
router.delete("/:id", remove);

module.exports = router;
