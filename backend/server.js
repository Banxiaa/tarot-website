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
    description: "时间之流牌阵",
    count: 3,
    slots: [
      { name: "过去", meaning: "过往的影响" },
      { name: "现在", meaning: "当下的状态" },
      { name: "未来", meaning: "未来的走向" },
    ],
  };

  res.json(response);
});

// 模拟 Interpret（解读）
app.post("/api/interpret", (req, res) => {
  const { question, chosenCards } = req.body;
  console.log("收到解读请求：", { question, chosenCards });

  const response = {
    question,
    chosenCards,
    interpretation: `
### 塔罗解读（示例）

你的问题是：**${question}**

1. **${chosenCards?.[0]?.name || "牌1"}**
   - 代表过去的影响。
   - 说明你近期受到一些旧事的牵制。

2. **${chosenCards?.[1]?.name || "牌2"}**
   - 象征你当前的状态。
   - 表示你正在思考新的方向。

3. **${chosenCards?.[2]?.name || "牌3"}**
   - 显示未来的走向。
   - 提示你需要保持耐心，机会会出现。

---
⚠️ 以上为固定示例内容，仅用于测试前端流程。
    `
  };

  res.json(response);
});

// 启动服务器
app.listen(8787, () => {
  console.log("✅ Mock 后端已启动: http://127.0.0.1:8787");
});
