const express = require("express");
const router = express.Router();
const Notice = require("../db/notice");
const NoticePopup = require("../db/noticePopup");
const auth = require("../middlewares/authMiddleware");

router.post("/show-notice-popup", auth, async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ message: "studentId가 필요합니다." });
    }

    // 모든 팝업 공지
    const popupNotices = await Notice.find({ type: true }).lean();

    // 숨긴 공지 목록 조회
    const hiddenRecords = await NoticePopup.find({ studentId }).lean();
    const hiddenIds = hiddenRecords.map((r) => r.noticeId.toString());

    const noticesWithHiddenFlag = popupNotices.map((n) => {
      const isHidden = hiddenIds.includes(n._id.toString()); // ✅ 문자열로 비교
      return {
        id: n._id,
        title: n.title,
        contents: n.contents,
      };
    });

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
    const visibleNotices = noticesWithHiddenFlag.filter((n) => {
      return !n.isHidden && n.start_date <= today && n.end_date >= today;
    });
    return res.status(200).json(visibleNotices);
  } catch (err) {
    console.error("show-notice-popup 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
