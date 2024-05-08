// index.js에서 sequelize 객체 불러오기
const { sequelize } = require('./index.js'); // DB 객체 불러오기

const sync = () => {
  sequelize // promise 객체 반환
    .sync({ force: true, alter: true }) // force: true -> 테이블 재생성, alter: true -> 테이블 변경사항 반영
    .then(() => { console.log('데이터베이스 동기화 완료'); })
    .catch((err) => { console.error(err); });
}

module.exports = sync; // sync 함수 모듈로 내보내기