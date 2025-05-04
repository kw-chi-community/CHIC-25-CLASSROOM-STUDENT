const express = require("express");
const router = express.Router();
const Notice = require("../db/notice");

// GET /api/notice-list
router.get("/notice-list", async (req, res) => {
  try {
    const notices = await Notice.find({}).sort({ created_at: -1 }).lean(); // 최신순 정렬

    const simplified = notices.map(n => ({
      id: n._id,
      created_at: new Date(n.created_at).toISOString().slice(0, 10), // ✅ 날짜만 자르기
      type: n.type,
      title: n.title
    }));

    return res.status(200).json(simplified);
  } catch (err) {
    console.error("notice-list 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;