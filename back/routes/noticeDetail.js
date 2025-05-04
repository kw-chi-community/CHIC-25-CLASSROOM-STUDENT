const express = require("express");
const router = express.Router();
const Notice = require("../db/notice");
const { Types } = require("mongoose");

// POST /api/notice-detail
router.post("/notice-detail", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id가 필요합니다." });
    }

    const notice = await Notice.findById(id).lean();

    if (!notice) {
      return res.status(404).json({ message: "공지사항을 찾을 수 없습니다." });
    }

    return res.status(200).json({
      id: notice._id,
      created_at: new Date(notice.created_at).toISOString().slice(0, 10),
      type: notice.type,
      title: notice.title,
      contents: notice.contents
    });
  } catch (err) {
    console.error("notice-detail 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;