const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
const Joi = require("joi");

const isAuth = require("../middlewares/auth.middleware").auth;
const validate = require("../middlewares/validate.middleware");

const signupSchema = Joi.object().keys({
  emailId: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
  username: Joi.string().required(),
});

const followSchema = Joi.object().keys({
  Followed: Joi.number().required().min(1),
});

router.get('/deleteUser',isAuth,UserController.deleteuser);
router.post("/signUp", validate(signupSchema), UserController.register);
router.post("/follow", [isAuth, validate(followSchema)], UserController.follow);
router.post("/getFollowers", [isAuth], UserController.getFollowers);
router.post("/getTweetsForUser", [isAuth], UserController.getTweetsForUser);
router.get("/searchUsers", [isAuth], UserController.searchUsers);
router.get("/getUserStats", [isAuth], UserController.getUserStats);

module.exports = router;
