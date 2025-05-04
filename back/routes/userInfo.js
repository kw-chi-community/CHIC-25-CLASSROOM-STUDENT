const express = require("express");
const router = express.Router();
const Students = require("../db/student"); // students 컬렉션 연결

// POST /api/user-info
router.post("/user-info", async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "studentId가 필요합니다." });
    }

    const student = await Students.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "해당 학생을 찾을 수 없습니다." });
    }

    return res.status(200).json({
      email: student.email,
      name: student.name,
      phoneNumber: student.phoneNumber
    });
  } catch (err) {
    console.error("user-info 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;