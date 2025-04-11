const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo"); // DB 모델

router.post("/check-room", async (req, res) => {
  const { building } = req.body;

  try {
    const results = await ClassroomInfo.find({ building }); // Mongoose는 이 자체가 배열

    const rooms = results.map((room) => ({
      building: room.building,
      room: room.room
    }));

    return res.status(200).json({ ok: true, rooms });
  } catch (err) {
    console.error("check-room 오류:", err);
    return res.status(500).json({ ok: false, message: "서버 오류" });

  }
});

module.exports = router;