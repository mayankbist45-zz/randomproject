module.exports = (sequelize, Sequelize) => {
  const Tweet = sequelize.define("Tweet", {
    userId: Sequelize.INTEGER,
    tweet: Sequelize.STRING(10000),
  });

  return Tweet;
};
