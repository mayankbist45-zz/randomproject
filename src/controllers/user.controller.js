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
    try{

      let data = await Followers.findOne({
        where : {
          Follower : req.user.id,
          Followed : req.body.Followed
        }
      })
      let msg = "";
      if(data.length === 0){
        await Followers.create({
          Follower : req.user.id,
          Followed : req.body.Followed
        });
        msg = "Followed Successfully";
      }
      else{
        await Followers.destory({
          where : {
            Follower : req.user.id,
            Followed : req.body.Followed
          }
        });
        msg = "UnFollowed Successfully";
      }
      return res.status(200).send({
        status : "Success",
        msg: msg 
      })
    }
    catch(e){
      return res.status(500).send({
        status : "Failed",
        massage : "ServerSide Error"
      })
    }
};

const getFollowers = async (req, res) => {
    try{
      let data = Followers.findAll({
        where : {
          Followed : req.user.id 
        },
        attributes : [Follower]
      })
      console.log(data)
      data = await User.findAll({
        where  : {
          id : data.Follower
        }
      })

      return res.status(200).send({
        status : "Success",
        msg : "Followers Data",
        data : data
      });
    }
    catch(e){
      return res.status(500).send({
        status : "Failed",
        massage : "ServerSide Error"
      })
    }
};

const getUserStats = (req, res) => {
  //getUserStats api logic here
};

const searchUsers = (req, res) => {
  try{
    let data = await User.findOne({
      where : {
        username : req.query.user
      }
    })
    return res.send(200).send({
      status : "Success",
      message : "User data",
      data : data
    })
  }
  catch(e){
    return res.status(500).send({
      status : "Failed",
      message : "ServerSide Error"
    })
  }
};

const getTweetsForUser = (req, res) => {
    try{
      let data = await Followers.findAll({
        where : {
          Follower : req.user.id
        },
        attributes : [Followed]
      });

      data = Tweet.findAll({
        where : {
          userId : data.Followed
        },
        orderby : ['createdAt','ASC']
      })
      return res.status(200).send({
        status : "Success",
        msg : "Tweet ",
        data : data
      })
    }
    catch(e){
      return res.status(500).send({
        status : "Failed",
        massage : "ServerSide Error"
      })
    }
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
