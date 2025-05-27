const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo");
const Reservation = require("../db/reservation");
const Schedule = require("../db/mongodb").classDB.collection("schedule");
const auth = require("../middlewares/authMiddleware");
const { classDB } = require("../db/mongodb");

// 시간 포맷 보정 함수 (선택사항)
const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

// 학기명 조회 함수
const getSemesterByDate = async (dateStr) => {
  const targetDate = new Date(dateStr);
  const semesterDoc = await Schedule.findOne({
    start_time: { $lte: targetDate },
    end_time: { $gte: targetDate },
  });
  if (!semesterDoc) return null;
  return `${semesterDoc.year}-${semesterDoc.semester}`;
};

// POST /api/make-reservation
router.post("/make-reservation", auth, async (req, res) => {
  try {
    const {
      studentId,
      date,
      building,
      room,
      startTime,
      endTime,
      purpose,
      professor,
      participantCount,
    } = req.body;

    if (!studentId || !date || !building || !room || !startTime || !endTime || !purpose || !professor || !participantCount) {
      return res.status(400).json({ message: "필수 입력값 누락" });
    }

    const classroom = await ClassroomInfo.findOne({ building, room });
    if (!classroom) {
      return res.status(404).json({ message: "해당 강의실 정보 없음" });
    }

    // 시간 포맷 보정
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    // ✅ 중복 예약 확인 (예약)
    const duplicate = await Reservation.findOne({
      classroom_info_id: classroom._id,
      reserve_date: new Date(date),
      reserve_start_time: { $lt: formattedEndTime },
      reserve_end_time: { $gt: formattedStartTime },
    });

    if (duplicate) {
      return res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
    }

    // ✅ 중복 확인 (강의)
    const semesterKey = await getSemesterByDate(date);
    if (semesterKey) {
      const classCollection = classDB.collection(semesterKey);

      const buildingPrefix = {
        복지관: "복", 비마관: "비", 새빛관: "새빛", 연구관: "연", 옥의관: "옥",
        참빛관: "참", 한울관: "한울", 화도관: "화", 기념관: "기", 누리관: "누"
      }[building];

      const classroomIdx = buildingPrefix ? `${buildingPrefix}${room.replace("호", "")}` : null;

      if (classroomIdx) {
        const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date(date).getDay()];

        const classResults = await classCollection.find({ classroom_idx: classroomIdx }).toArray();
        const hasOverlap = classResults.some(cls => {
          if (!cls[`week_${weekday}`]) return false;
          const classStart = cls[`${weekday}_start_time`];
          const classEnd = cls[`${weekday}_end_time`];
          return classStart < formattedEndTime && classEnd > formattedStartTime;
        });

        if (hasOverlap) {
          return res.status(409).json({ message: "해당 시간에 강의가 이미 배정되어 있습니다." });
        }
      }
    }

    // ✅ 새 예약 생성
    const newReservation = await Reservation.create({
      reserve_idx: new Date().getTime(),
      reserve_date: new Date(date),
      reserve_start_time: formattedStartTime,
      reserve_end_time: formattedEndTime,
      student_id: studentId,
      reservation_confirmed: 1,
      classroom_info_id: classroom._id,
      professor,
      participant_count: participantCount,
      purpose,
    });

    return res.status(201).json({ reservationId: newReservation._id });
  } catch (err) {
    console.error("make-reservation 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
