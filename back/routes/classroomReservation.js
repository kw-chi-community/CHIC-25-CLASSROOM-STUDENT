const express = require("express");
const router = express.Router();
const ClassroomInfo = require("../db/classroomInfo");
const Reservation = require("../db/reservation");
const Class = require("../db/class");
const Student = require("../db/student");
const { ObjectId } = require("mongodb");

const buildingMap = {
  복지관: "복", 비마관: "비", 새빛관: "새빛", 연구관: "연", 옥의관: "옥",
  참빛관: "참", 한울관: "한울", 화도관: "화", 기념관: "기", 누리관: "누"
};

const getWeekdayKey = (dateStr) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[new Date(dateStr).getDay()];
};

router.post("/classroom-reservation", async (req, res) => {
  try {
    const { building, room, date } = req.body;

    if (!building || !room || !date) {
      return res.status(400).json({ message: "building, room, date는 필수입니다." });
    }

    const classroom = await ClassroomInfo.findOne({ building, room });
    if (!classroom) return res.status(404).json({ message: "해당 강의실 정보 없음" });

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);
    const weekday = getWeekdayKey(date); // mon, tue, ...

    // ✅ 예약 정보 가져오기
    const reservations = await Reservation.find({
      classroom_info_id: classroom._id,
      reserve_date: { $gte: startOfDay, $lte: endOfDay }
    }).lean();

    const reservationResults = await Promise.all(reservations.map(async (r) => {
      const student = await Student.findOne({ studentId: r.student_id });
      return {
        type: "reservation",
        start_time: r.reserve_start_time,
        end_time: r.reserve_end_time,
        user: student?.name || r.student_id,
        purpose: r.purpose
      };
    }));

    // ✅ 수업 정보 가져오기
    const shortRoom = room.replace("호", "");
    const roomIdx = `${buildingMap[building] || ""}${shortRoom}`;
    const classResults = await Class.find({ classroom_idx: roomIdx }).lean();

    const lectureResults = classResults
      .filter(c => c[`week_${weekday}`])
      .map(c => ({
        type: "lecture",
        start_time: c[`${weekday}_start_time`],
        end_time: c[`${weekday}_end_time`],
        subject: c.class_name || "수업",
        professor: c.prof_name || "미정"
      }));

    return res.status(200).json([...reservationResults, ...lectureResults]);

  } catch (err) {
    console.error("classroom-reservation 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;