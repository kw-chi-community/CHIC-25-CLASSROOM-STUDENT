const express = require("express");
const router = express.Router();
const ClassModel = require("../db/class");
const ReservationModel = require("../db/reservation");

// 강의실 사용 여부 확인 API
router.get("/status", async (req, res) => {
  try {
    const classes = await ClassModel.find().lean();
    const reservations = await ReservationModel.find().lean();

    // 강의 정보 변환
    const classDTOs = classes.map(cls => {
      return {
        roomNumber: cls.classroom || "미정", // 강의실 정보 추가 필요
        date: cls.class_daytime,
        title: cls.class_name,
        startTime: cls.mon_start_time || cls.wed_start_time || cls.fri_start_time || "00:00",
        endTime: cls.mon_end_time || cls.wed_end_time || cls.fri_end_time || "00:00",
        type: "강의",
        professor: cls.prof_name
      };
    });

    // 예약 정보 변환
    const reservationDTOs = reservations.map(r => {
      const isoDate = new Date(r.reserve_date).toISOString().split("T")[0];
      return {
        roomNumber: r.class_idx, // 예약 강의실 정보 필요
        date: isoDate,
        title: r.reserve_title,
        startTime: r.reserve_start_time,
        endTime: r.reserve_end_time,
        type: "예약",
        reserver: `User#${r.account_idx}`
      };
    });

    // 데이터 병합 및 정렬
    let mergedData = [...classDTOs, ...reservationDTOs];
    const timeToMinutes = (timeStr) => {
      const [hh, mm] = timeStr.split(":");
      return parseInt(hh, 10) * 60 + parseInt(mm, 10);
    };

    mergedData.sort((a, b) => {
      if (!a.startTime) return -1;
      if (!b.startTime) return 1;
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

    return res.json({
      code: 200,
      message: "강의실 사용 현황",
      data: mergedData
    });
  } catch (error) {
    console.error("/api/status 에러:", error);
    res.status(500).json({
      code: 500,
      message: "서버 오류",
      error: error.message
    });
  }
});

module.exports = router;
