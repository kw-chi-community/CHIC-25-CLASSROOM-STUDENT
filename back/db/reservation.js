// db/reservation.js
const mongoose = require('mongoose');
const { classDB } = require('./mongodb');

// 수정: class_idx를 String으로
const reservationSchema = new mongoose.Schema({
  reserve_idx: { type: Number, required: true, unique: true },
  class_idx: { type: String, required: true },   // MongoDB에 문자열 "0000-1-8128-01" 존재
  account_idx: { type: Number, required: true },
  reserve_title: { type: String, required: true },
  reserve_date: { type: Date, required: true },
  reserve_start_time: { type: String, required: true }, // "09:00"
  reserve_end_time: { type: String, required: true },   // "10:30"
  selectedAt: { type: Date, default: Date.now },
  reservation_confirmed: { type: Number, default: 0 }
}, { versionKey: false });

module.exports = classDB.model('Reservation', reservationSchema, 'reserve');
