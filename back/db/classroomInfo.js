const mongoose = require("mongoose");
const { classDB } = require("./mongodb");

const ClassroomInfoSchema = new mongoose.Schema({
  building: { type: String, required: true },
  room: { type: String, required: true },
  canReserve: { type: Boolean, default: false }
}, { versionKey: false });

module.exports = classDB.model("ClassroomInfo", ClassroomInfoSchema, "classroom_info");