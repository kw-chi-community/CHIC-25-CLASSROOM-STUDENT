const express = require("express");
const router = express.Router();
const Reservation = require("../db/reservation");
const { ObjectId } = require("mongodb");

// DELETE /api/delete-reservation
router.delete("/delete-reservation", async (req, res) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ message: "reservationId가 필요합니다." });
    }

    const result = await Reservation.deleteOne({ _id: new ObjectId(reservationId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "해당 예약을 찾을 수 없습니다." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("delete-reservation 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;