var express = require("express");
var router = express.Router();
const checkStudentId = require("../handlers/checkStudentId");

router.post("/", checkStudentId); // 학번 중복 검사 핸들러

module.exports = router;