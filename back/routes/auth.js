const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../db/student");

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res.status(400).json({ message: "학번과 비밀번호를 입력하세요." });
    }

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(401).json({ message: "존재하지 않는 학번입니다." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    return res.status(200).json({
      message: "로그인 성공",
      data: {
        studentId: student.studentId,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;