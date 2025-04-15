const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo");
const Reservation = require("../db/reservation");

// POST /api/make-reservation
router.post("/make-reservation", async (req, res) => {
  try {
    const {
      studentId,
      date,
      building,
      room,
      startTime,
      endTime,
      purpose,
      professor,
      participantCount,
    } = req.body;

    if (!studentId || !date || !building || !room || !startTime || !endTime || !purpose || !professor || !participantCount) {
      return res.status(400).json({ message: "필수 입력값 누락" });
    }

    const classroom = await ClassroomInfo.findOne({ building, room });
    if (!classroom) {
      return res.status(404).json({ message: "해당 강의실 정보 없음" });
    }

    const newReservation = await Reservation.create({
      reserve_idx: new Date().getTime(),
      reserve_date: new Date(date),
      reserve_start_time: startTime,
      reserve_end_time: endTime,
      student_id: studentId,
      reservation_confirmed: 1,
      classroom_info_id: classroom._id,
      professor,
      participant_count: participantCount,
      purpose,
    });

    return res.status(201).json({ reservationId: newReservation._id });
  } catch (err) {
    console.error("make-reservation 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;