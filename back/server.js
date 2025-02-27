require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { userDB, classDB, noticeDB } = require("./db/mongodb"); // DB 연결
const authRouter = require("./routes/auth"); // 추가된 라우터

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 라우터 등록
app.use("/api", authRouter);

// 서버 실행
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
