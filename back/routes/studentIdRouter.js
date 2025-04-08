const express = require("express");
const router = express.Router();
const checkStudentId = require("./handlers/checkStudentId");

router.post("/signup/check-id", checkStudentId);

module.exports = router;