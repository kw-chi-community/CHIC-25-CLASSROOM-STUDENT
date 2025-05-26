const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo");
const Reservation = require("../db/reservation");
const { ObjectId } = require("mongodb");
const auth = require("../middlewares/authMiddleware");
const { classDB } = require("../db/mongodb");
const Schedule = classDB.collection("schedule");

const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const getSemesterByDate = async (dateStr) => {
  const targetDate = new Date(dateStr);
  const semesterDoc = await Schedule.findOne({
    start_time: { $lte: targetDate },
    end_time: { $gte: targetDate },
  });
  if (!semesterDoc) return null;
  return `${semesterDoc.year}-${semesterDoc.semester}`;
};

router.put("/update-reservation", auth, async (req, res) => {
  try {
    const {
      reservationId,
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

    if (!reservationId || !studentId || !date || !building || !room || !startTime || !endTime || !purpose || !professor || !participantCount) {
      return res.status(400).json({ message: "필수 입력값 누락" });
    }

    const existing = await Reservation.findOne({ _id: new ObjectId(reservationId) });
    if (!existing) {
      return res.status(404).json({ message: "해당 예약을 찾을 수 없습니다." });
    }

    if (existing.student_id !== studentId) {
      return res.status(403).json({ message: "본인의 예약만 수정할 수 있습니다." });
    }

    const classroom = await ClassroomInfo.findOne({ building, room });
    if (!classroom) {
      return res.status(404).json({ message: "해당 강의실 정보 없음" });
    }

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    const conflict = await Reservation.findOne({
      _id: { $ne: new ObjectId(reservationId) },
      classroom_info_id: classroom._id,
      reserve_date: new Date(date),
      reserve_start_time: { $lt: formattedEndTime },
      reserve_end_time: { $gt: formattedStartTime },
    });

    if (conflict) {
      return res.status(409).json({ message: "해당 시간에 다른 예약이 존재합니다." });
    }

    // ✅ 수업 중복 체크
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

    await Reservation.updateOne(
      { _id: new ObjectId(reservationId) },
      {
        $set: {
          reserve_date: new Date(date),
          reserve_start_time: formattedStartTime,
          reserve_end_time: formattedEndTime,
          classroom_info_id: classroom._id,
          professor,
          participant_count: participantCount,
          purpose
        }
      }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("update-reservation 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
