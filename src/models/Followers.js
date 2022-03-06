module.exports = (sequelize, Sequelize) => {
  const Followers = sequelize.define("Followers", {
    Follower: Sequelize.INTEGER,
    Followed: Sequelize.INTEGER,
  });

  return Followers;
};
