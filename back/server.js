require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 요청을 처리

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));