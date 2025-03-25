const express = require("express");
const router = express.Router();
const { handler: sendEmail } = require("../handlers/sendEmail");

router.post("/signup/email", sendEmail);

module.exports = router;
