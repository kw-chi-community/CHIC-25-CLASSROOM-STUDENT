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

const buildingMap = {
  복지관: "복",
  비마관: "비",
  새빛관: "새빛",
  연구관: "연",
  옥의관: "옥",
  참빛관: "참",
  한울관: "한울",
  화도관: "화",
  기념관: "기",
  누리관: "기",
  미지정: null,
  "": null,
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
      reserve_date: {
        $gte: new Date(date + "T00:00:00.000Z"),
        $lt: new Date(date + "T23:59:59.999Z"),
      },
      reserve_title: building,
      classroom_idx: room,
    }).toArray();

    const reservationTimes = reservationResults.map((r) => ({
      startTime: r.reserve_start_time,
      endTime: r.reserve_end_time,
    }));

    // 2️⃣ 수업 정보 조회
    const buildingPrefix = buildingMap[building];
    const computedClassroomIdx = buildingPrefix
      ? `${buildingPrefix}${room.replace("호", "")}`
      : null;
    if (!computedClassroomIdx) {
      return res.status(400).json({ message: "유효하지 않은 건물명입니다." });
    }

    const classResults = await Class.find({
      classroom_idx: computedClassroomIdx,
    }).toArray();

    const classTimes = classResults
      .filter((cls) => cls[`week_${weekday}`])
      .map((cls) => ({
        startTime: cls[`${weekday}_start_time`],
        endTime: cls[`${weekday}_end_time`],
      }));

    // 3️⃣ 합쳐서 응답
    return res.status(200).json([...reservationTimes, ...classTimes]);
  } catch (err) {
    console.error("check-time 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
