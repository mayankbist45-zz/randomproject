const userModel = require("../services/db.services").User;
const bcrypt = require("bcrypt");
const Tweet = require("../services/db.services").Tweet;
const Followers = require("../services/db.services").Followers;
const User = require("../services/db.services").User;
require("dotenv").config();

const register = (req, res) => {
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
            username: req.body.username,
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

const follow = async (req, res) => {
  try {
    let data = await Followers.findOne({
      where: {
        Follower: req.user.id,
        Followed: req.body.Followed,
      },
    });
    let msg = "";
    if (!data || data.length === 0) {
      await Followers.create({
        Follower: req.user.id,
        Followed: req.body.Followed,
      });
      msg = "Followed Successfully";
    } else {
      await Followers.destroy({
        where: {
          Follower: req.user.id,
          Followed: req.body.Followed,
        },
      });
      msg = "UnFollowed Successfully";
    }
    return res.status(200).send({
      status: "Success",
      msg: msg,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      massage: "ServerSide Error",
    });
  }
};

async function findFollowers(req) {
  let data = await Followers.findAll({
    where: {
      Followed: req.user.id,
    },
    attributes: ["Follower"],
  });
  console.log(data);
  let followers = data.map((follower) => follower.Follower);
  data = await User.findAll({
    where: {
      id: followers,
    },
  });

  return data;
}

const getFollowers = async (req, res) => {
  try {
    data = await findFollowers(req);

    return res.status(200).send({
      status: "Success",
      msg: "Followers Data",
      data: data,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      massage: "ServerSide Error",
    });
  }
};

const getUserStats = async (req, res) => {
  try {
    data = await Followers.findAll({
      where: {
        Followed: req.user.id,
      },
      attributes: ["Follower"],
    });
    let follower = data.map((follower) => follower.Follower);

    data = await User.findAndCountAll({
      where: {
        id: follower,
      },
    });
    let tweetdata = await Tweet.findAndCountAll({
      where: {
        userId: req.user.id,
      },
    });
    return res.status(200).send({
      status: "Success",
      msg: "User Stats",
      followersCount: data.count,
      tweetCount: tweetdata.count,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      massage: "ServerSide Error",
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    let data = await User.findOne({
      where: {
        username: req.query.user,
      },
    });

    return res.status(200).send({
      status: "Success",
      message: "User data",
      data: { id: data.id, username: data.username, email: data.email },
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      message: "ServerSide Error",
    });
  }
};

const getTweetsForUser = async (req, res) => {
  try {
    let data = await Followers.findAll({
      where: {
        Follower: req.user.id,
      },
      attributes: ["Followed"],
    });

    console.log(data);
    let followers = data.map((follower) => follower.Followed);

    data = await Tweet.findAll({
      where: {
        userId: followers,
      },
      orderby: ["createdAt", "DESC"],
    });
    return res.status(200).send({
      status: "Success",
      msg: "Tweets",
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: "Failed",
      massage: "ServerSide Error",
    });
  }
};

const deleteuser = async (req,res) => {
  try{
    await Tweet.destroy({
      where : {
        userId : req.user.id
      }
    });

    await User.destroy({
      where : {
        id : req.user.id
      }
    });

    return res.status(200).send({
      status : "Success",
      message : "User Deleted"
    })
  }
  catch(e){
    return res.status(500).send({
      status : "Failed",
      message : "Server Side Error"
    })
  }
}
const UserController = {
  register,
  follow,
  getFollowers,
  getUserStats,
  searchUsers,
  getTweetsForUser,
  deleteuser
};

module.exports = UserController;
