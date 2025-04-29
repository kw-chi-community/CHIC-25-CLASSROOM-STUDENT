const express = require("express");
const router = express.Router();
const NoticePopup = require("../db/noticePopup");

// POST /api/hidden-popup
router.put("/hidden-popup", async (req, res) => {
  try {
    const { studentId, noticeId } = req.body;
    if (!studentId || !noticeId) {
      return res.status(400).json({ message: "필수 데이터 누락" });
    }

    const existing = await NoticePopup.findOne({ studentId, noticeId });
    if (existing) {
      return res.status(200).json({ success: true }); // 이미 숨긴 경우도 OK 처리
    }

    await NoticePopup.create({ studentId, noticeId });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("hidden-popup 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;