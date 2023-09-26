const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader, " ", token);
    if (!token) {
      return res.status(403).sned("Access denied");
    }

    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

module.exports = {
  auth,
};
