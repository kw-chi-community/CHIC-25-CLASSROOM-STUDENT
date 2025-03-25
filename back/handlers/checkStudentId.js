const Student = require("../db/student");

const handler = async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ 
      ok: false, 
      message: "학번이 필요합니다." 
    });
  }

  const existingStudent = await Student.findOne({ studentId });

  if (existingStudent) {
    return res.status(409).json({ 
      ok: false, 
      data: { isAvailable: false },
      message: "이미 존재하는 학번입니다." 
    });
  }

  res.status(200).json({ 
    ok: true, 
    data: { isAvailable: true },
    message: "사용 가능한 학번입니다." 
  });
};

module.exports = handler;