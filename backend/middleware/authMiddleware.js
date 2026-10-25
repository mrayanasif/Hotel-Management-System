const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Access Denied! No Token Provided.",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      status: false,
      message: "Invalid or Expired Token",
    });

  }
};

module.exports = authMiddleware;