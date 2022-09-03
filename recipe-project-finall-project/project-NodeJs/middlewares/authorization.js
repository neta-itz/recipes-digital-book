const { verifyToken } = require("../services/token");

function authorizationMiddlware(req, res, next) {
  const tokenFromClient = req.header("autorisation");
  if (!tokenFromClient) return res.status(401).json("Please Send Token");

  const userInfo = verifyToken(tokenFromClient);
  if (!userInfo) return res.status(401).json("Invalid  Token!");

  req.user = userInfo;

  next();
}

module.exports = authorizationMiddlware;
