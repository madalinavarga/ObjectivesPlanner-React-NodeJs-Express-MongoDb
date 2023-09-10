const express = require("express");
const router = express.Router();
const getAllBySection = require("./controllers");

router.get("/", getAllBySection);

module.exports = router;
