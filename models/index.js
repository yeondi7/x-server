

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require('./user');
const Post = require('./post');

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

User.init(sequelize);
Post.init(sequelize);

db.User = User;
db.Post = Post;

User.associate(db);
Post.associate(db);

module.exports = db;
