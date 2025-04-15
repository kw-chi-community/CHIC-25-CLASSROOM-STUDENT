const express = require("express");
const router = express.Router();
const Reservation = require("../db/reservation");

// POST /api/reservation-list
router.get("/reservation-list", async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "studentId가 필요합니다." });
    }
    const reservations = await Reservation.find({ student_id: studentId }).populate("classroom_info_id");

    const result = reservations.map(r => ({
      id: r._id,
      building: r.classroom_info_id?.building || null,
      room: r.classroom_info_id?.room || null,
      reserve_date: new Date(r.reserve_date).toISOString().slice(0, 10),
      reserve_start_time: r.reserve_start_time,
      reserve_end_time: r.reserve_end_time,
      reservation_confirmed: r.reservation_confirmed
    }));

    return res.status(200).json(result);
  } catch (err) {
    console.error("reservation-list 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;