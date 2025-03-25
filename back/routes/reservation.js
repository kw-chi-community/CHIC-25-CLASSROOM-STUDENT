// routes/reservation.js
const express = require('express');
const router = express.Router();
const Reservation = require('../db/reservation');

// POST /api/reserve - 예약 생성
router.post('/reserve', async (req, res) => {
  try {
    const {
      reserve_idx,
      class_idx,
      account_idx,
      reserve_title,
      reserve_date,
      reserve_start_time,
      reserve_end_time,
      reservation_confirmed
    } = req.body;

    const parsedDate = new Date(reserve_date);

    const newReservation = new Reservation({
      reserve_idx,
      class_idx,
      account_idx,
      reserve_title,
      reserve_date: parsedDate,
      reserve_start_time,
      reserve_end_time,
      reservation_confirmed: reservation_confirmed || 0
    });

    await newReservation.save();

    return res.status(201).json({
      code: 201,
      message: "예약 생성 성공",
      data: newReservation
    });
  } catch (error) {
    console.error("예약 생성 오류:", error);
    return res.status(500).json({
      code: 500,
      message: "예약 생성 실패",
      error: error.message
    });
  }
});

// GET /api/reserve - 예약 목록 조회
router.get('/reserve', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reserve_idx: 1 }).lean();
    return res.status(200).json({
      code: 200,
      message: "예약 목록 조회 성공",
      data: reservations
    });
  } catch (error) {
    console.error("예약 조회 오류:", error);
    return res.status(500).json({
      code: 500,
      message: "예약 조회 실패",
      error: error.message
    });
  }
});

module.exports = router;
