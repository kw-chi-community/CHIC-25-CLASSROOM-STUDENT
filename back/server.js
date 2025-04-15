require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reserveRoomRouter = require('./routes/reserveRoom');
const reservationDetailRoute = require("./routes/reservationDetail");


// DB 연결
const { userDB, classDB, noticeDB, studentDB } = require('./db/mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// 기본 라우트(테스트용)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 라우터 등록
app.use('/api', require('./routes/reservation'));        // 예약 관련
app.use('/api', require('./routes/status'));             // 예약 현황
app.use('/api', require('./routes/auth'));               // 로그인
app.use('/api', require('./routes/registerRouter'));     // 회원가입 (POST /api/signup)
app.use('/api', require('./routes/studentIdRouter'));    // 학번 중복 검사 (POST /api/signup/check-id)
app.use('/api', require('./routes/sendEmailRouter'));    // 이메일 인증 (POST /api/signup/email)
app.use("/api", require("./routes/classroomInfo"));
app.use('/api/reserve', reserveRoomRouter); // ✅ 변경: POSTMAN 기준으로 경로 맞춤
app.use("/api", require("./routes/makereserve"));
app.use("/api", require("./routes/reservationDetail"));
app.use("/api", require("./routes/reservationList"));

// 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});