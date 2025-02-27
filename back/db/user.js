// user.js
const mongoose = require('mongoose');
const { userDB } = require('./mongodb'); // userDB 연결

const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,          // "2024404001 "처럼 뒤에 공백이 들어올 수 있으니 trim 옵션
      // minlength, maxlength 등을 제거하거나 원하는 대로 유지 (공백 문제 있으면 차라리 없애는 게 나음)
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // DB에 phone 필드가 없는 경우가 많다면 필수로 두지 않는 게 좋음
      required: false,
      default: "", 
      // 굳이 형식 검증이 필요 없다면 match 제거
      // match: /^010-\d{4}-\d{4}$/,
    },
    // 예약 이력을 저장할 배열 (원한다면 그대로 두거나 제거 가능)
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

// 컬렉션명을 'ic'로 지정했으므로 Atlas에서 'ic' 안의 문서를 조회/저장
const Student = userDB.model('Student', studentSchema, 'ic');
module.exports = Student;
