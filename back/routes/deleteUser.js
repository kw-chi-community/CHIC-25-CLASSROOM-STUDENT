const express = require("express");
const router = express.Router();
const Students = require("../db/student");

// DELETE /api/delete-user
router.delete("/delete-user", async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "studentId가 필요합니다." });
    }

    const result = await Students.deleteOne({ studentId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "해당 학생을 찾을 수 없습니다." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("delete-user 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;