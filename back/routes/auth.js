const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../db/student");
require("dotenv").config();

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

    // ✅ JWT 토큰 생성
    const token = jwt.sign({ studentId: student.studentId }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // ✅ 콘솔에 출력해서 Postman 테스트 시 복사 가능
    console.log("🔑 JWT Token:", token);

    return res.status(200).json({
      message: "로그인 성공",
      data: {
        accessToken: token,  // ✅ 프론트에서 sessionStorage에 저장
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