// db/classBySemester.js
const mongoose = require('mongoose');
const { classDB } = require('./mongodb');

const classSchema = new mongoose.Schema({
  class_idx: { type: String, required: true, unique: true },
  classroom_idx: { type: String },
  class_name: { type: String, required: true },
  prof_name: { type: String, required: true },
  class_credit: { type: Number, required: true },
  class_daytime: { type: String, required: true },
  department: { type: String },
  building: { type: String },
  room: { type: String },
  week_mon: Boolean,
  week_tue: Boolean,
  week_wed: Boolean,
  week_thu: Boolean,
  week_fri: Boolean,
  mon_start_time: String,
  mon_end_time: String,
  tue_start_time: String,
  tue_end_time: String,
  wed_start_time: String,
  wed_end_time: String,
  thu_start_time: String,
  thu_end_time: String,
  fri_start_time: String,
  fri_end_time: String
}, { versionKey: false });

// 경우에 따라 다른 클렌션을 통해 수업을 찾아오기 위해 모델이 있으면 reuse 하는 기능
const getClassModelBySemester = (collectionName) => {
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }
  return classDB.model(collectionName, classSchema, collectionName);
};

module.exports = getClassModelBySemester;
