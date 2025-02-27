// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// user.js(또는 student.js)에서 내보낸 모델이 "Student"라고 가정
// 스키마에는 id(학번, 10자리), name, phone 등이 있다고 했음
const Student = require("../db/user");

// POST /api/login
// Request Body: { "id": "학번(10자리)" }
router.post("/login", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        code: 400,
        message: "학번(ID)을 입력하세요.",
      });
    }

    // DB에서 사용자(학생) 조회
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(401).json({
        code: 401,
        message: "해당 학번의 사용자가 없습니다.",
      });
    }

    // JWT 토큰 발급
    // (비밀키는 .env 파일의 JWT_SECRET에 저장)
    const token = jwt.sign(
      { id: student.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // 응답
    // 프론트 login.ts에서 data.data.accessToken을 참조한다고 했으므로
    // "data" 객체 내부에 "accessToken"이라는 키로 넣어준다.
    res.status(200).json({
      code: 200,
      message: "로그인 성공",
      data: {
        accessToken: token,
        id: student.id,
        name: student.name,
        phone: student.phone,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({
      code: 500,
      message: "서버 오류",
    });
  }
});

// 테스트용 보호된 리소스 예시
// GET /api/protected-resource (토큰 필요)
router.get("/protected-resource", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        code: 401,
        message: "인증 토큰이 없습니다.",
      });
    }

    // "Authorization: Bearer <token>" 형태에서 token 추출
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 토큰이 유효하므로 보호된 리소스 접근 가능
    res.status(200).json({
      code: 200,
      message: "보호된 리소스 접근 성공",
      data: decoded, // { id: student.id, iat, exp 등 }
    });
  } catch (error) {
    console.error("보호된 리소스 접근 오류:", error);
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰",
    });
  }
});

module.exports = router;
