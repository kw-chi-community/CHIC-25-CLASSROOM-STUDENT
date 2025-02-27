require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 이미 정의해둔 DB 연결
const { userDB, classDB, noticeDB } = require('./db/mongodb');

// 개별 라우터 불러오기
// 1) 예약 생성/조회용 라우터
const reservationRouter = require('./routes/reservation');
// 2) 예약 현황 조회(/api/status) 라우터
const statusRouter = require('./routes/status');
// 3) 로그인/회원 관리 라우터 (예: /api/login 등)
const usersRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// 기본 라우트(테스트용)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 라우터 등록
app.use('/api', reservationRouter);  // 예: POST /api/reserve, GET /api/reserve ...
app.use('/api', statusRouter);       // 예: GET /api/status ...
app.use('/api', usersRouter);        // 예: POST /api/login, GET /api/mypage ...

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
