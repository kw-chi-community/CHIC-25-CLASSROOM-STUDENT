// db/reservation.js
const mongoose = require('mongoose');
const { classDB } = require('./mongodb'); // 이미 선언된 "classDB" 연결

const reservationSchema = new mongoose.Schema({
  reserve_idx: {
    type: Number,
    required: true,
    unique: true
  },
  class_idx: {
    type: Number,
    required: true
  },
  account_idx: {
    type: Number,
    required: true
  },
  reserve_title: {
    type: String,
    required: true
  },
  reserve_date: {
    type: Date,
    required: true
  },
  reserve_start_time: {
    type: String,
    required: true
  },
  reserve_end_time: {
    type: String,
    required: true
  },
  selectedAt: {
    type: Date,
    default: Date.now
  },
  reservation_confirmed: {
    type: Number,
    default: 0
  }
}, { versionKey: false });

// 세 번째 인자로 'reserve' 지정 => "class" DB 안의 "reserve" 컬렉션 생성
module.exports = classDB.model('Reservation', reservationSchema, 'reserve');
