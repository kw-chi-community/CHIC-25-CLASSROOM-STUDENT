const express = require("express");
const router = express.Router();
const Classroom = require("../db/classroom_info"); // ✅ collection 모델

// POST /api/reserve/check-room
router.post("/check-room", async (req, res) => {
  const { building } = req.body;

  if (!building) {
    return res.status(400).json({ ok: false, message: "건물 이름이 필요합니다." });
  }

  try {
    const rooms = await Classroom.find({ building }, { building: 1, room: 1, _id: 0 });
    res.status(200).json({ ok: true, data: rooms });
  } catch (error) {
    console.error("check-room 오류:", error);
    res.status(500).json({ ok: false, message: "서버 오류" });
  }
});

module.exports = router;