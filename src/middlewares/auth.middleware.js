const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.auth = (req, res, next) => {
  let { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  }
  return res.status(403).send({ msg: "Authorization Required" });
};
