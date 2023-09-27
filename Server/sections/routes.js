const express = require("express");
const router = express.Router();
const { getByFilter, create, remove, update } = require("./controllers");
const { auth } = require("../middleware/auth");

router.get("/", auth, getByFilter);
router.post("/", auth, create);
router.delete("/:id", auth, remove);
router.put("/:id", update);

module.exports = router;
