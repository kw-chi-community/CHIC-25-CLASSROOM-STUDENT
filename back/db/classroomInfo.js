const mongoose = require("mongoose");
const { classDB } = require("./mongodb");

const ClassroomInfoSchema = new mongoose.Schema({
  building: { type: String, required: true },
  room: { type: String, required: true },

  equipment: [{ type: String }],
  minNumberOfUsers: { type: Number, default: null },
  contactDepartment: { type: String },
  contactLocation: { type: String },
  contactNumber: { type: String }

}, { versionKey: false });

module.exports = classDB.model("ClassroomInfo", ClassroomInfoSchema, "classroom_info");