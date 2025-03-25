const mongoose = require('mongoose');
const { classDB } = require('./mongodb'); 

const reservationSchema = new mongoose.Schema({
  reserve_idx: { type: Number, required: true, unique: true },
  class_idx: { type: String, required: true }, 
  account_idx: { type: Number, required: true },
  reserve_title: { type: String, required: true },
  reserve_date: { type: Date, required: true },
  reserve_start_time: { type: String, required: true }, 
  reserve_end_time: { type: String, required: true },
  selectedAt: { type: Date, default: Date.now },
  reservation_confirmed: { type: Number, default: 0 }
}, { versionKey: false });

module.exports = classDB.model('Reservation', reservationSchema, 'reserve');