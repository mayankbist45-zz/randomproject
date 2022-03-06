const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//importing all models here
db.Tweet = require("../models/Tweet")(sequelize, Sequelize);
db.TweetLike = require("../models/Tweetlike")(sequelize, Sequelize);
db.User = require("../models/User")(sequelize, Sequelize);
db.Followers = require("../models/Followers")(sequelize, Sequelize);

module.exports = db;
