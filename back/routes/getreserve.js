const express = require("express");
const router = express.Router();
const Reservation = require("../db/reservation");
const ClassroomInfo = require("../db/classroomInfo");
const { ObjectId } = require("mongodb");
const auth = require("../middlewares/authMiddleware");

router.post("/get-reservation", auth, async (req, res) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ message: "reservationId가 필요합니다." });
    }

    // 예약 조회
    const reservation = await Reservation.findOne({ _id: new ObjectId(reservationId) });
    if (!reservation) {
      return res.status(404).json({ message: "예약 정보를 찾을 수 없습니다." });
    }

    // 강의실 정보 조회
    const classroom = await ClassroomInfo.findOne({ _id: reservation.classroom_info_id });
    if (!classroom) {
      return res.status(404).json({ message: "강의실 정보를 찾을 수 없습니다." });
    }

    return res.status(200).json({
      studentId: reservation.student_id,
      date: reservation.reserve_date.toISOString().slice(0, 10), // YYYY-MM-DD
      building: classroom.building,
      room: classroom.room,
      startTime: reservation.reserve_start_time,
      endTime: reservation.reserve_end_time,
      purpose: reservation.purpose,
      professor: reservation.professor,
      participantCount: reservation.participant_count
    });

  } catch (err) {
    console.error("get-reservation 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;