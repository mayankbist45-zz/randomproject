module.exports = (sequelize, Sequelize) => {
  const tweetLike = sequelize.define("TweetLike", {
    userId: Sequelize.INTEGER,
    tweetId: Sequelize.INTEGER,
  });

  return tweetLike;
};
