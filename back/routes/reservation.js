const express = require("express");
const router = express.Router();
const { classDB } = require("../db/mongodb");

const Class = classDB.collection("class");
const Reserve = classDB.collection("reserve");

// 요일 매핑
const getDayField = (dateStr) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[new Date(dateStr).getDay()];
};

// POST /api/reserve/check-time
router.post("/reserve/check-time", async (req, res) => {
  try {
    const { date, building, room } = req.body;
    if (!date || !building || !room) {
      return res.status(400).json({ message: "date, building, room 필수" });
    }

    const weekday = getDayField(date); // 예: mon

    // 1️⃣ 예약 정보 조회
    const reservationResults = await Reserve.find({
      reserve_date: new Date(date),
      reserve_title: building,
      class_idx: room
    }).toArray();

    const reservationTimes = reservationResults.map(r => ({
      startTime: r.reserve_start_time,
      endTime: r.reserve_end_time
    }));

    // 2️⃣ 수업 정보 조회
    const lectureQuery = {
      classroom_idx: room,
      [`week_${weekday}`]: true
    };

    const classResults = await Class.find(lectureQuery).toArray();

    const classTimes = classResults.map(cls => ({
      startTime: cls[`${weekday}_start_time`],
      endTime: cls[`${weekday}_end_time`]
    }));

    // 3️⃣ 합쳐서 응답
    return res.status(200).json([...reservationTimes, ...classTimes]);
  } catch (err) {
    console.error("check-time 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;