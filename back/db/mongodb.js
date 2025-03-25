const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' })

// "user" 데이터베이스 연결
const userDB = mongoose.createConnection(process.env.MONGO_URI_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// "classroom" 데이터베이스 연결
const classDB = mongoose.createConnection(process.env.MONGO_URI_CLASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// "notice" 데이터베이스 연결
const noticeDB = mongoose.createConnection(process.env.MONGO_URI_NOTICE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// "student" 데이터베이스 연결
const studentDB = mongoose.createConnection(process.env.MONGO_URI_STUDENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 연결 성공 여부 확인
userDB.on('connected', () => console.log('MongoDB (user) 연결 완료'));
userDB.on('error', err => console.error('MongoDB (user) 연결 실패:', err));

classDB.on('connected', () => console.log('MongoDB (class) 연결 완료'));
classDB.on('error', err => console.error('MongoDB (class) 연결 실패:', err));

noticeDB.on('connected', () => console.log('MongoDB (notice) 연결 완료'));
noticeDB.on('error', err => console.error('MongoDB (notice) 연결 실패:', err));

studentDB.on('connected', () => console.log('MongoDB (student) 연결 완료'));
studentDB.on('error', err => console.error('MongoDB (student) 연결 실패:', err));

module.exports = { studentDB };
module.exports = { userDB, classDB, noticeDB, studentDB };