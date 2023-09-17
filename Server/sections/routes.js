const express = require("express");
const router = express.Router();
const { getByFilter, create, remove, update } = require("./controllers");

router.get("/", getByFilter);
router.post("/", create);
router.delete("/:id", remove);
router.put("/:id", update);

module.exports = router;
