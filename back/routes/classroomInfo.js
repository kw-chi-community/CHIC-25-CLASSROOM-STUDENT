const express = require("express");
const router = express.Router();
const { classDB } = require("../db/mongodb");

// classroomInfo 컬렉션 참조
const ClassroomInfo = classDB.collection("classroom_info");

router.post("/reserve/classroom-info", async (req, res) => {
  try {
    const { building, room } = req.body;
    if (!building || !room) {
      return res.status(400).json({ message: "building, room 필수" });
    }

    const info = await ClassroomInfo.findOne({
      building: { $regex: `^${building.trim()}`, $options: "i" },
      room: { $regex: `^${room.trim()}`, $options: "i" },
    });
    if (!info) {
      return res.status(404).json({ message: "해당 강의실 정보를 찾을 수 없습니다." });
    }

    const response = {
      equipment: info.equipment,
      minNumberOfUsers: info.minNumberOfUsers,
      contactDepartment: info.contactDepartment,
      contactLocation: info.contactLocation,
      contactNumber: info.contactNumber
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("classroom-info 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
