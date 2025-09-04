import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 固定返回一个模拟牌阵
app.post("/api/spread", (req, res) => {
  const question = req.body.question || "未提供问题";
  console.log("收到问题：", question);

  const response = {
    description: "三张牌：过去 / 现在 / 未来",
    count: 3,
    slots: [
      { name: "过去", meaning: "过往的影响" },
      { name: "现在", meaning: "当下的状态" },
      { name: "未来", meaning: "未来的走向" },
    ],
  };

  res.json(response);
});

// 启动服务器
app.listen(8787, () => {
  console.log("✅ Mock 后端已启动: http://127.0.0.1:8787");
});
