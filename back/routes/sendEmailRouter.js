var express = require("express");
var router = express.Router();
const sendEmail = require("../handlers/sendEmail");

router.post("/", sendEmail); // 이메일 전송 핸들러

module.exports = router;