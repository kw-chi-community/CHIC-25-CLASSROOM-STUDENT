const express = require("express");
const router = express.Router();
const Reservation = require("../db/reservation");
const ClassroomInfo = require("../db/classroomInfo");

// POST /api/reservation-detail
router.post("/reservation-detail", async (req, res) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ message: "reservationId가 필요합니다." });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "예약 정보를 찾을 수 없습니다." });
    }

    const classroom = await ClassroomInfo.findById(
      reservation.classroom_info_id
    );
    if (!classroom) {
      return res
        .status(404)
        .json({ message: "강의실 정보를 찾을 수 없습니다." });
    }

    return res.status(200).json({
      id: reservation._id,
      reserve_date: new Date(reservation.reserve_date)
        .toISOString()
        .slice(0, 10),
      reserve_start_time: reservation.reserve_start_time,
      reserve_end_time: reservation.reserve_end_time,
      student_id: reservation.student_id,
      reserve_reason: reservation.purpose,
      building: classroom.building,
      room: classroom.room,
      reservation_confirmed: reservation.reservation_confirmed,
      equipment: classroom.equipment,
      contactDepartment: classroom.contactDepartment,
      contactLocation: classroom.contactLocation,
      contactNumber: classroom.contactNumber,
    });
  } catch (err) {
    console.error("reservation-detail 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
