const express = require("express");
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');

const isauth = require('../middlewares/auth.middleware').auth;
const Joi = require('joi')
const validator = require('../middlewares/validate.middleware');

const addtweetschema = Joi.object().keys({
    userId :  Joi.number().min(0).required(),
    tweet : Joi.string().min(1).max(10000).required()
})

const liketweetschema = Joi.object().keys({
    tweetId : Joi.number().required()
})

router.post('/addtweet',[isauth,validator(addtweetschema)],TweetController.tweet);
router.get('/deletetweet',[isauth],TweetController.deleteTweet);
router.put('/liketweet',[isauth,validator(liketweetschema), TweetController.likeTweet])
module.exports = router;