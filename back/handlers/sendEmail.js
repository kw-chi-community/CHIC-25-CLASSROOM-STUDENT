const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_ID,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

const otpStorage = {}; // 이메일별 OTP 저장

const handler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ ok: false, message: "이메일 주소가 필요합니다." });
  }

  const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  otpStorage[email] = generatedCode; // OTP 저장

  const mailOptions = {
    from: process.env.NODE_MAILER_ID,
    to: email,
    subject: "인증 코드",
    html: `인증번호는 <strong>${generatedCode}</strong> 입니다.`,
  };

  try {
    await smtpTransport.sendMail(mailOptions);
    res.status(200).json({ ok: true, code: generatedCode });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ ok: false, message: "이메일 전송 실패" });
  }
};

module.exports = handler;