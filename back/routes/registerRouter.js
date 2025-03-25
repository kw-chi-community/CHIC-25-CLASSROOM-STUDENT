var express = require("express");
var router = express.Router();
const registerUser = require("../handlers/registerUser");

router.post("/", registerUser); // 회원가입 핸들러

module.exports = router;