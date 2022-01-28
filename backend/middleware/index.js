const JWT = require("jsonwebtoken");

exports.verifyToken = (token) => {
  try {
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};
