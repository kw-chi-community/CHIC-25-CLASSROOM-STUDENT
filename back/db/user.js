// user.js
const mongoose = require('mongoose');
const { userDB } = require('./mongoConnection'); // userDB 연결

const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      minlength: 10, // 무조건 학번 10자리
      maxlength: 10,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^010-\d{4}-\d{4}$/, // 010-0000-0000 형식 검증
    },
    // 예약 이력을 저장할 배열
    reservation_status: [
      {
        room: { type: String, default: '' },
        date: { type: String, default: '' },
        start_time: { type: String, default: '' },
        end_time: { type: String, default: '' },
        purpose: { type: String, default: '' },
      }
    ],
  },
  { versionKey: false }
);

const Student = userDB.model('Student', studentSchema, 'ic'); // userDB 사용, 컬렉션명 ic
module.exports = Student;
