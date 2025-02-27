// routes/reservation.js
const express = require('express');
const router = express.Router();
const Reservation = require('../db/reservation');

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

    // Date 객체로 변환 (예: "2025-02-06T00:00:00.000Z" 형태)
    const parsedDate = new Date(reserve_date);

    // 새 문서 생성
    const newReservation = new Reservation({
      reserve_idx,
      class_idx,
      account_idx,
      reserve_title,
      reserve_date: parsedDate,
      reserve_start_time,
      reserve_end_time,
      // selectedAt 기본값은 Date.now()
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

router.get('/reserve', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reserve_idx: 1 });
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
