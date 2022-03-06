const express = require("express");
const router = express.Router();
const TweetController = require("../controllers/tweet.controller");

const isauth = require("../middlewares/auth.middleware").auth;
const Joi = require("joi");
const validator = require("../middlewares/validate.middleware");

const addtweetschema = Joi.object().keys({
  username: Joi.string().min(1).required(),
  tweet: Joi.string().min(1).max(10000).required(),
});

const liketweetschema = Joi.object().keys({
  tweetId: Joi.number().required(),
});

router.post(
  "/tweet",
  [isauth, validator(addtweetschema)],
  TweetController.tweet
);

router.delete("/deletetweet", [isauth], TweetController.deleteTweet);

router.put("/liketweet", [
  isauth,
  validator(liketweetschema),
  TweetController.likeTweet,
]);
module.exports = router;
