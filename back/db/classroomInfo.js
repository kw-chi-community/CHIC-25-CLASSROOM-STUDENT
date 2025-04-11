const mongoose = require("mongoose");
const { classDB } = require("./mongodb");

const ClassroomInfoSchema = new mongoose.Schema({
  building: { type: String, required: true },
  room: { type: String, required: true },
  canReserve: { type: Boolean, default: false },

  // 새 필드 추가
  equipment: [String],
  minNumberOfUsers: Number,
  contactDepartment: String,
  contactLocation: String,
  contactNumber: String
}, { versionKey: false });

module.exports = classDB.model("ClassroomInfo", ClassroomInfoSchema, "classroom_info");