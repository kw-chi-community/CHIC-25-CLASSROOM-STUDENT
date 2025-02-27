// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../db/user"); // User 모델

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID를 입력하세요." });
    }

    // DB에서 사용자 조회
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(401).json({ error: "사용자를 찾을 수 없습니다." });
    }

    // JWT 발급
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 프론트 login.ts에서 data.data.accessToken을 참조하므로
    // 반환 형식을 아래처럼 "data" 객체 안에 "accessToken"으로 넣는다.
    res.json({
      data: {
        accessToken: token,
        id: user.id,
        // User 모델에 name, phone 필드가 있다고 가정
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 테스트용 보호된 리소스 예시
// GET /api/protected-resource (토큰 필요)
router.get("/protected-resource", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "인증 토큰이 없습니다." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 인증이 유효하면 보호된 리소스 접근 가능
    res.json({ data: "보호된 리소스 접근 성공", user: decoded });
  } catch (error) {
    console.error("보호된 리소스 접근 오류:", error);
    return res.status(401).json({ error: "유효하지 않은 토큰" });
  }
});

module.exports = router;
