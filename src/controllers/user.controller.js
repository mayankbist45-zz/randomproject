const userModel = require("../services/db.services").User;
const bcrypt = require("bcrypt");

require("dotenv").config();

const register = (req, res) => {
  //register api logic here
  userModel
    .findAll({
      where: {
        emailId: req.body.emailId,
      },
    })
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        userModel
          .create({
            emailId: req.body.emailId,
            password: hash,
          })
          .catch((err) => console.log("Error in signup controller", err));

        return res.send({
          msg: "User Signed Up Successfully",
        });
      }
      return res.send({
        msg: "user already exist",
      });
    })
    .catch((err) => console.log("Error in signup controller", err));
};

const follow = (req, res) => {
  //follow api logic here
};

const getFollowers = (req, res) => {
  //getFollowers api logic here
};

const getUserStats = (req, res) => {
  //getUserStats api logic here
};

const searchUsers = (req, res) => {
  //searchUsers api logic here
};

const getTweetsForUser = (req, res) => {
  //get all tweets for a user api logic here
};

const UserController = {
  register,
  follow,
  getFollowers,
  getUserStats,
  searchUsers,
  getTweetsForUser,
};

module.exports = UserController;
