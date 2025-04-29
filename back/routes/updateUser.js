const express = require("express");
const router = express.Router();
const Students = require("../db/student");

// PUT /api/update-user
router.put("/update-user", async (req, res) => {
  try {
    const { studentId, name, phoneNumber } = req.body;

    if (!studentId || !name || !phoneNumber) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요." });
    }

    const result = await Students.updateOne(
      { studentId },
      { $set: { name, phoneNumber } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "학생을 찾을 수 없습니다." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("update-user 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;