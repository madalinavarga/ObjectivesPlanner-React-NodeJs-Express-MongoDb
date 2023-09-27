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

const authWithRefresh = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(403).send("Access denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(403).send("Access denied");
    }

    try {
      const verifiedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      const accessToken = jwt.sign({ user: verifiedRefresh.user }, process.env.TOKEN_KEY, {
        expiresIn: "15m",
      });
      res
        .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" })
        .send(verified.user); //?
    } catch (error) {
      return res.status(400).send("Invalid token");
    }
  }
};

module.exports = {
  auth,
  authWithRefresh
};
