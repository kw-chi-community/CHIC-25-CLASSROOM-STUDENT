const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../db/student");

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    // 프론트에서 id로 보낸 값을 studentId로 매핑
    const { id, email, name, password } = req.body;
    const studentId = id; // id를 studentId로 변환

    // 필드 검증
    if (!studentId || !email || !name || !password) {
      return res.status(400).json({ message: "모든 필드를 입력하세요." });
    }

    // 학번 중복 검사
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: "이미 존재하는 학번입니다." });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 학생 정보 저장
    const newStudent = new Student({ studentId, email, name, password: hashedPassword });
    await newStudent.save();

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;