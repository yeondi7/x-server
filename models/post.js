const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static init(sequelize) {{ // 1번째 매개변수: 테이블 컬럼 정의
    return super.init(
      {
        userID: {
          type: Sequelize.STRING(50),
          allowNull: false,
          //unique: true
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        }
      }, { // 2번째 매개변수: 테이블 설정
        sequelize, // 첫번째 매개변수로 받은 시퀄라이즈 객체, 데이터베이스와의 연결
        timestamps: true, // createdAt, updatedAt 컬럼 생성
        paranoid: true, // deletedAt 컬럼 생성(복구, 추적할 때)
        modelName: 'Post', // 모델 이름
        tableName: 'post' // 실제 테이블 이름
      }
    );
  }}
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: 'userID', sourceKey: 'userID' });
    // belongsTo: 다른 모델(User)에 속해있다.
    // hasMany를 쓰지 않는 이유는 Post가 User에 속해있기 때문
    // foreignKey: 다른(User) 모델의 키, sourceKey: 현재(Post) 모델의 키
    // 첫번째 인자: 다른 모델, 두번째 인자: 설정
  }
}

module.exports = Post;