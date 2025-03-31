// 📁 back/routes/reservation.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Classroom = require("../db/classroom");

// POST /api/reserve/check-room
router.post("/reserve/check-room", authMiddleware, async (req, res) => {
  const { building } = req.body;
  if (!building) {
    return res.status(400).json({ ok: false, message: "건물명을 입력하세요." });
  }

  try {
    const rooms = await Classroom.find({ building });
    const result = rooms.map((room) => ({
      room: room.room,
      canReserve: room.canReserve,
    }));
    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    console.error("건물 조회 오류:", error);
    res.status(500).json({ ok: false, message: "서버 오류" });
  }
});

module.exports = router;
