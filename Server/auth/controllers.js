const user = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    let checkEmail = await user.findOne({ email });
    if (checkEmail) {
      return res.status(400).send("User Already Exists. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log("error:", error);
  }
};

const loginUser = async (req, res) => {
  console.log("login");
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(400).send("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect Password");
    }

    const token = jwt.sign(
      {
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1d" });

    res.cookie("refreshToken", refreshToken);
    res.status(200).json(token);
  } catch (error) {
    console.log("error:", error);
  }
};

const refreshToken = async (req, res) => {
  console.log("in refresh");
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      return res.status(403).send("Access denied");
    }
    const verified = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const accessToken = jwt.sign({ user: verified.user }, process.env.TOKEN_KEY, {
      expiresIn: "15m",
    });
    res.status(200).json(accessToken);
  } catch (error) {
    console.log("error:", error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
