const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development'; // 환경변수
const config = require(__dirname + '/../config/config.json')[env]; 
//__dirname은 현재 파일이고 절대경로를 사용할 때는 꼭 써주는 것이 좋다고 한다.
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
db.Sequelize = Sequelize; // 클래스

User.init(sequelize);
Post.init(sequelize);

db.User = User;
db.Post = Post;

User.associate(db);
Post.associate(db);

module.exports = db;
