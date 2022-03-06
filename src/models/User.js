module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    emailId: Sequelize.STRING(50),
    password: Sequelize.STRING(200),
    username: {
      type: Sequelize.STRING(200),
      unique: true,
    },
  });

  return User;
};
