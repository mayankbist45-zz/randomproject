const Tweet = require("../services/db.services").Tweet;
const TweetLike = require("../services/db.services").TweetLike;

/** Add Tweet
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const tweet = async (req, res) => {
  try {
    //verify username
    if (username !== req.body.username) {
      return res.send({
        status: "Success",
        msg: "Incorrect Username",
      });
    }
    //create tweet
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

/** Delete Tweet
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const deleteTweet = async (req, res) => {
  try {
    //verifing tweet id
    if (req.query.id === undefined || +req.query.id === NaN) {
      return res.status(400).send({
        status: "Error",
        message: "Bad Input",
      });
    }
    //delete tweet
    await Tweet.destroy({
      where: {
        userId: req.user.id,
        id: +req.query.id,
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

/** Like and Unlike Tweet
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const likeTweet = async (req, res) => {
  try {
    // check if tweet id exists
    let data = await Tweet.findOne({
      where: {
        id: req.body.tweetId,
      },
    });

    if (!data || data.length === 0) {
      return res.send(400).send({
        status: "Success",
        message: "Bad Input",
      });
    }
    //find tweet is alredy liked or not
    data = await TweetLike.findOne({
      where: {
        tweetId: req.body.tweetId,
        userId: req.user.id,
      },
    });

    if (!data || data.length === 0) {
        //like tweet
      await TweetLike.create({
        tweetId: req.body.tweetId,
        userId: req.user.id,
      });
      return res.status(201).send({
        status: "Success",
        message: "Tweet Liked",
      });
    }
    //unlike tweet
    await TweetLike.destroy({
      where: {
        tweetId: req.body.tweetId,
        userId: req.user.id,
      },
    });
    return res.status(200).send({
      status: "Success",
      message: "Tweet Unliked",
    });
  } catch (e) {
    console.log(e);
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
