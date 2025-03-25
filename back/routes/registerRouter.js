const express = require("express");
const router = express.Router();
const registerUser = require("../handlers/registerUser");

router.post("/signup", registerUser); //엔드포인트 설정

module.exports = router;