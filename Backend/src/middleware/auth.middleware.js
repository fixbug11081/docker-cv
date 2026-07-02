const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklisttoken.model");

async function authUser(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "provide token" });
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const decoded = await jwt.verify(token, process.env.SECRETS);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authUser };
