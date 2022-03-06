const Tweet = require("../services/db.services").Tweet;
const TweetLike = require("../services/db.services").TweetLike;

const tweet = async (req, res) => {
  try {
    await Tweet.create({ userId: req.user.id, tweet: req.body.tweet });

    return res.status(201).send({
      status: "Success",
      message: `Tweet: ${req.body.tweet} is successfully tweeted by user: ${req.body.username}`,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      message: "Server Side Error",
    });
  }
};

const deleteTweet = async (req, res) => {
  try {
    if (req.query.id === undefined || !Number.isInteger(req.query.id)) {
      return res.status(400).send({
        status: "Success",
        message: "Bad Input",
      });
    }
    await tweet.destroy({
      where: {
        userId: req.user.id,
        tweet: req.query.id,
      },
    });

    return res.status(202).send({
      status: "Success",
      message: "Tweet Deleted",
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      message: "Server Side Error",
    });
  }
};

const likeTweet = async (req, res) => {
  try {
    let data = await Tweet.findOne({
      where: {
        id: req.body.tweetId,
      },
    });

    if (data.length === 0) {
      return res.send(400).send({
        status: "Success",
        message: "Bad Input",
      });
    }
    data = await TweetLike.findOne({
      where: {
        tweetId: req.body.tweetId,
        userId: req.user.id,
      },
    });

    if (data.length === 0) {
      await TweetLike.create({
        tweetId: req.body.tweetId,
        userId: req.user.id,
      });
    } else {
      await TweetLike.destroy({
        where: {
          tweetId: req.body.tweetId,
          userId: req.user.id,
        },
      });
    }

    return res.status(201).send({
      status: "Success",
      message: "Tweet Liked",
    });
  } catch (e) {
    return res.status(500).send({
      status: "Failed",
      message: "Server Side Error",
    });
  }
};

const NotesController = {
  tweet,
  deleteTweet,
  likeTweet,
};

module.exports = NotesController;
