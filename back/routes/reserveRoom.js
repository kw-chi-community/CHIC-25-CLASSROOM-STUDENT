const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo"); // DB 모델

router.post("/check-room", async (req, res) => {
  const { building } = req.body;

  try {
    const rooms = await ClassroomInfo.find({ building }, { building: 1, room: 1, _id: 0 });
    res.json({ ok: true, rooms });
  } catch (error) {
    console.error("check-room error:", error);
    res.status(500).json({ ok: false, message: "서버 오류" });
  }
});

module.exports = router;