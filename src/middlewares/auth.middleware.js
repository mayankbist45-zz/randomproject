const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.auth = (req, res, next) => {
  let bearerHeader = req.headers["authorization"];

  const bearer = bearerHeader.split(" ");
  if (bearer.length !== 2 || bearer[0] != "Bearer") {
    return res.status(403).send({ msg: "Authorization Required" });
  }

  const token = bearer[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "Invalid Token" });
      }
      console.log(user);
      req.user = user;
      next();
    });
  } else {
    return res.status(403).send({ msg: "Authorization Required" });
  }
};
