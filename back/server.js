require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userDB, classDB, noticeDB } = require('./db/mongodb');

const reservationRouter = require('./routes/reservation');

const app = express();
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 라우터 설정 (/api/reserve 로 POST/GET 요청 받음)
app.use('/api', reservationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
