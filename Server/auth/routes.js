const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { loginUser, registerUser, refreshToken } = require("./controllers");

router.use(cookieParser());

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/refresh", refreshToken);

module.exports = router;
