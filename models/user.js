const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) { // 1번째 매개변수: 테이블 컬럼 정의
    return super.init(
      {
        userID: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
        },
        userName: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        profile: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
      }, { // 2번째 매개변수: 테이블 자체 설정
        sequelize,
        timestamps: true, // createdAt, updatedAt 컬럼 생성
        paranoid: true, // deletedAt 컬럼 생성
        modelName: 'User', // 모델 이름
        tableName: 'user' // 실제 테이블 이름
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: 'userID', sourceKey: 'userID' });
    // hasMany: 다른 모델(Post)에 속해있다.
    // belongsTo를 쓰지 않는 이유는 User가 Post에 속해있기 때문
    // foreignKey: 다른(Post) 모델의 키, sourceKey: 현재(User) 모델의 키
  }
}

module.exports = User;