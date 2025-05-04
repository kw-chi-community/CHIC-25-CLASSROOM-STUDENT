const mongoose = require("mongoose");
const { noticeDB } = require("./mongodb");

const noticePopupSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  noticeId: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { versionKey: false });

module.exports = noticeDB.model("NoticePopup", noticePopupSchema, "notice_popup");