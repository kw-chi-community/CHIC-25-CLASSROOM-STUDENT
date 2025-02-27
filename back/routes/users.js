const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../db/user'); // User 모델
const Reservation = require('../db/reservation'); // 예약 모델
const authMiddleware = require('../middleware/authMiddleware'); // 인증 미들웨어

// 🔹 1. 로그인 (POST) - 토큰 발급
router.post('/login', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID를 입력하세요.' });

    // 사용자 확인 (DB 조회)
    let user = await User.findOne({ id });
    if (!user) return res.status(401).json({ error: '사용자를 찾을 수 없습니다.' });

    // JWT 토큰 생성
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: '로그인 성공', token });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 🔹 2. 마이 페이지 조회 (GET) - JWT 필요
router.get('/mypage', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    if (!user) return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });

    res.json(user);
  } catch (error) {
    console.error('마이 페이지 조회 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 🔹 3. 예약하기 (POST) - JWT 필요
router.post('/reserve', authMiddleware, async (req, res) => {
  try {
    const { id, name, room, date } = req.body;
    if (!id || !name || !room || !date) {
      return res.status(400).json({ error: '모든 필드를 입력하세요.' });
    }

    const newReservation = new Reservation({ id, name, room, date });
    await newReservation.save();

    res.status(201).json({ message: '예약 완료', reservation: newReservation });
  } catch (error) {
    console.error('예약 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 🔹 4. 게시판 조회 (GET)
router.get('/board', async (req, res) => {
  try {
    const posts = await Post.find(); // 게시판 모델에서 데이터 가져오기
    res.json(posts);
  } catch (error) {
    console.error('게시판 조회 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 🔹 5. 예약 현황 조회 (GET)
router.get('/status', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error('예약 현황 조회 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 🔹 6. 마이 페이지 정보 수정 (PUT) - JWT 필요
router.put('/mypage/modify', authMiddleware, async (req, res) => {
  try {
    const { room, date } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { id: req.user.id },
      { room, date },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });

    res.json({ message: '정보 수정 완료', user: updatedUser });
  } catch (error) {
    console.error('정보 수정 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;