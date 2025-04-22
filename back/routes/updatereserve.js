const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo");
const Reservation = require("../db/reservation");
const { ObjectId } = require("mongodb");

router.put("/update-reservation", async (req, res) => {
  try {
    const {
      reservationId,
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

    // 필수값 확인
    if (!reservationId || !studentId || !date || !building || !room || !startTime || !endTime || !purpose || !professor || !participantCount) {
      return res.status(400).json({ message: "필수 입력값 누락" });
    }

    // 기존 예약 조회
    const existing = await Reservation.findOne({ _id: new ObjectId(reservationId) });
    if (!existing) {
      return res.status(404).json({ message: "해당 예약을 찾을 수 없습니다." });
    }

    // 본인 예약인지 확인
    if (existing.student_id !== studentId) {
      return res.status(403).json({ message: "본인의 예약만 수정할 수 있습니다." });
    }

    // 강의실 정보 다시 확인
    const classroom = await ClassroomInfo.findOne({ building, room });
    if (!classroom) {
      return res.status(404).json({ message: "해당 강의실 정보 없음" });
    }

    // 예약 정보 업데이트
    await Reservation.updateOne(
      { _id: new ObjectId(reservationId) },
      {
        $set: {
          reserve_date: new Date(date),
          reserve_start_time: startTime,
          reserve_end_time: endTime,
          classroom_info_id: classroom._id,
          professor,
          participant_count: participantCount,
          purpose
        }
      }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("update-reservation 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;