module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    emailId: Sequelize.STRING(50),
    password: Sequelize.STRING(200),
    username: Sequelize.STRING(100),
  });

  return User;
};
