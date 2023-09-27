const user = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const refreshToken = req.cookies["refreshToken"];

    if (!token && !refreshToken) {
      return res.status(403).send("Access denied");
    }
    const { email } = jwt.verify(token, process.env.TOKEN_KEY, { ignoreExpiration: true });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    const newToken = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "15m",
    });
    res.status(200).json(newToken);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("A sarit peste");
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
