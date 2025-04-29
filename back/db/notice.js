const mongoose = require('mongoose');
const { noticeDB } = require('./mongodb'); // ✅ noticeDB 가져오기

const noticeSchema = new mongoose.Schema({
  admin_info_id: { type: String, required: true },   // 작성자 ID (ex: 이메일 또는 ObjectId)
  type: { type: Boolean, required: true },           // 팝업 여부 (true = 팝업 공지)
  start_date: { type: Date, required: true },        // 공지 시작 날짜
  end_date: { type: Date, required: true },          // 공지 종료 날짜
  title: { type: String, required: true },           // 제목
  contents: { type: String },                        // 공지 내용
  created_at: { type: Date, default: Date.now }      // 생성일시
}, { versionKey: false });

const Notice = noticeDB.model('Notice', noticeSchema, 'notices');
module.exports = Notice;