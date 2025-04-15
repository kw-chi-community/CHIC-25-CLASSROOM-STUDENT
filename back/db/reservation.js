const mongoose = require("mongoose");
const { classDB } = require("./mongodb");

const reservationSchema = new mongoose.Schema({
  reserve_idx: { type: Number, required: true }, // Added reserve_idx field
  reserve_date: { type: Date, required: true },
  reserve_start_time: { type: String, required: true },
  reserve_end_time: { type: String, required: true },
  student_id: { type: String, required: true },
  reservation_confirmed: { type: Number, default: 1 },
  classroom_info_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassroomInfo', // 이 부분 꼭 있어야 해
    required: true
  },
  professor: { type: String, required: true },
  participant_count: { type: Number, required: true },
  purpose: { type: String, required: true }
}, { versionKey: false });

module.exports = classDB.model("Reservation", reservationSchema, "reserve");