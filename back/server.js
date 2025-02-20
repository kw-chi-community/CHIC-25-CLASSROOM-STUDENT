require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { userDB, classDB, noticeDB } = require("./db/mongodb"); // 수정: DB 연결 가져오기

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 서버 실행
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));