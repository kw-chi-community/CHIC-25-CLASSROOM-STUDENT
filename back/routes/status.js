// routes/status.js
const express = require("express");
const router = express.Router();
// 예: Reservation 모델에 room, date, name, start_time, end_time, purpose 등이 저장되어 있다고 가정
const Reservation = require("../db/reservation");

/**
 * GET /api/status
 * 쿼리스트링으로 date(예: 2025-01-03) 등을 받으면 특정 날짜 필터 가능.
 * 여기서는 전체 예약 목록을 조회한 뒤, room+date별로 묶어서 응답하는 예시를 보여준다.
 */
router.get("/status", async (req, res) => {
  try {
    const dateParam = req.query.date; // 'YYYY-MM-DD' 형태로 들어온다고 가정 (ex: 2025-01-01)

    // 1) DB에서 예약 목록을 꺼낸다. (조건에 따라 날짜 필터)
    let filter = {};
    if (dateParam) {
      // dateParam을 Date 객체로 변환 (자정 시각)
      const startOfDay = new Date(dateParam);
      const endOfDay = new Date(dateParam);
      endOfDay.setDate(endOfDay.getDate() + 1); // 다음날 0시 직전까지

      // reserve_date 필드가 2025-01-01 00:00 ~ 2025-01-02 00:00 범위인지 확인
      filter = {
        reserve_date: {
          $gte: startOfDay,
          $lt: endOfDay
        }
      };
    }

    // find()로 목록 조회
    const allReservations = await Reservation.find(filter).lean();

    // 2) room, date별로 그룹화해서 [{ room, date, reservations: [] }, ...] 형태로 만든다.
    //    가령 DB에 room="103", reserve_date="2025-01-01"인 문서들끼리 한 배열에 모은다.
    const groupedData = {};

    for (const item of allReservations) {
      // 예: item.room = "103", item.reserve_date = 2025-01-01T00:00:00.000Z
      // 날짜를 YYYY-MM-DD로 변환
      const isoDate = new Date(item.reserve_date);
      const dateStr = isoDate.toISOString().split("T")[0]; 
      // room은 item.room (문자열이라고 가정)

      const key = `${item.room}_${dateStr}`; // ex) "103_2025-01-01"
      if (!groupedData[key]) {
        groupedData[key] = {
          room: item.room,
          date: dateStr,
          reservations: []
        };
      }

      // reservations 배열에 추가
      groupedData[key].reservations.push({
        name: item.name || "",         // DB 스키마에 따라 조정
        start_time: item.start_time,   // "09:00"
        end_time: item.end_time,       // "10:30"
        purpose: item.purpose || item.reserve_title || "" // 목적/제목
      });
    }

    // 3) 객체를 values 배열로 변환
    const result = Object.values(groupedData);

    // 최종 응답
    res.json({
      code: 200,
      message: "예약 현황(이용 시간표) 입니다.",
      data: result
    });
  } catch (error) {
    console.error("/api/status 에러:", error);
    res.status(500).json({
      code: 500,
      message: "서버 오류",
      error: error.message
    });
  }
});

module.exports = router;
