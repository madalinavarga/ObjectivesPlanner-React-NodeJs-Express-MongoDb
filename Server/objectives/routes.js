const express = require("express");
const router = express.Router();
const getAll = require("./controllers");

router.get("/", getAll);

module.exports = router;