const bcrypt = require("bcrypt");
const User = require("../models/User");
const { otpStorage } = require("./sendEmail"); // OTP 저장소 사용

const handler = async (req, res) => {
  const { studentId, email, name, password, otp } = req.body;

  if (!studentId || !email || !name || !password || !otp) {
    return res.status(400).json({ ok: false, message: "모든 필드를 입력해주세요." });
  }

  // OTP 검증
  if (otpStorage[email] !== otp) {
    return res.status(400).json({ ok: false, message: "잘못된 인증 코드입니다." });
  }

  // 학번 중복 검사
  const existingUser = await User.findOne({ studentId });
  if (existingUser) {
    return res.status(409).json({ ok: false, message: "이미 존재하는 학번입니다." });
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 저장
  const newUser = new User({
    studentId,
    email,
    name,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ ok: true, message: "회원가입 성공!" });
};

module.exports = handler;