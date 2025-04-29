const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo");
const Reservation = require("../db/reservation");
const Class = require("../db/class");
const Students = require("../db/student");
const { ObjectId } = require("mongodb");

const buildingMap = {
  복지관: "복", 비마관: "비", 새빛관: "새빛", 연구관: "연", 옥의관: "옥",
  참빛관: "참", 한울관: "한울", 화도관: "화", 기념관: "기", 누리관: "누",
};

router.post("/classroom-reservation", async (req, res) => {
  try {
    const { building, room } = req.body;

    if (!building || !room) {
      return res.status(400).json({ message: "building과 room은 필수입니다." });
    }

    const classroom = await ClassroomInfo.findOne({ building, room });
    if (!classroom) {
      return res.status(404).json({ message: "해당 강의실 정보 없음" });
    }

    // ✅ 모든 예약 가져오기 (날짜 필터 없이)
    const reservations = await Reservation.find({
      classroom_info_id: classroom._id
    }).lean();

    const formattedReservations = await Promise.all(reservations.map(async (r) => {
      const student = await Students.findOne({ studentId: r.student_id });
      return {
        type: "reservation",
        start_time: r.reserve_start_time,
        end_time: r.reserve_end_time,
        user: student?.name || r.student_id,
        purpose: r.purpose,
        date: r.reserve_date.toISOString().slice(0, 10) // YYYY-MM-DD
      };
    }));

    // ✅ 모든 수업 정보
    const shortRoom = room.replace("호", "");
    const classroomIdx = `${buildingMap[building] || ""}${shortRoom}`;

    const classResults = await Class.find({ classroom_idx: classroomIdx }).lean();

    // 평일별 수업 분해
    const weekdayMap = {
      mon: "월", tue: "화", wed: "수", thu: "목", fri: "금", sat: "토", sun: "일"
    };

    const expandedLectures = [];

    classResults.forEach(cls => {
      for (const weekday of Object.keys(weekdayMap)) {
        if (cls[`week_${weekday}`]) {
          expandedLectures.push({
            type: "lecture",
            start_time: cls[`${weekday}_start_time`],
            end_time: cls[`${weekday}_end_time`],
            subject: cls.subject || "수업",
            professor: cls.professor || "미정",
            date: `${weekdayMap[weekday]}요일` // 요일 기반으로만 표기
          });
        }
      }
    });

    return res.status(200).json([...formattedReservations, ...expandedLectures]);
  } catch (err) {
    console.error("classroom-reservation 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;