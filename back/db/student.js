const mongoose = require("mongoose");
const { studentDB } = require("./mongodb");

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber:{ type: String, required: true }
}, { versionKey: false });
 
module.exports = studentDB.model("Student", StudentSchema);

