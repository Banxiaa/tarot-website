import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

// 固定布局规则字典（2–10）
const layouts = {
    2: [2],
    3: [3],
    4: [2, 2],
    5: [3, 2],
    6: [3, 3],
    7: [2, 3, 2],
    8: [3, 3, 2],
    9: [3, 3, 3],
    10: [3, 2, 3, 2],
};

// 渲染卡牌函数
function renderCards(chosenCards, setChosenCards) {
    const count = chosenCards.length;
    let layout = layouts[count];

    // 如果没定义 → 自动分割（每行最多 3 张）
    if (!layout) {
        layout = [];
        let left = count;
        while (left > 0) {
        layout.push(Math.min(3, left));
        left -= Math.min(3, left);
        }
    }

    let idx = 0;
    return layout.map((row, rowIndex) => {
        const rowCards = chosenCards.slice(idx, idx + row);
        const baseIndex = idx;
        idx += row;

        return (
            <div
                key={rowIndex}
                style={{
                    display: "flex",
                    justifyContent:
                    row === 1 ? "center" : row === 2 ? "space-evenly" : "space-between",
                    marginBottom: "1rem",

                    maxWidth: `${row * 120}px`, // 限制最大宽度 (100px 卡片 + 20px 余量)
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
            {rowCards.map((card, i) => (
            <div
                key={i}
                onClick={() => {
                const newCards = [...chosenCards];
                newCards[baseIndex + i].revealed = true;
                setChosenCards(newCards);
                }}
                style={{
                width: "100px",
                height: "160px",
                border: "1px solid #000",
                background: card.revealed ? "#fff" : "#444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                }}
            >
                {card.revealed ? card.name : ""}
            </div>
            ))}
        </div>
        );
    });
}

export default function Spread({ spread, question, chosenCards, setChosenCards, onDone }) {
    const [mode, setMode] = useState("number");
    const [revealed, setRevealed] = useState(false);
    const [numberInput, setNumberInput] = useState("");
    spread.count = 5;

    return (
        <div>
        <h2>使用牌阵：{spread.description}</h2>
        <p>共需要抽取 {spread.count} 张牌</p>

        {/* 选择模式 */}
        {!mode && (
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button onClick={() => setMode("simulate")}>模拟抽牌</button>
            <button onClick={() => setMode("number")}>数字抽牌</button>
            </div>
        )}

        {/* 模拟抽牌模式 */}
        {mode === "simulate" && <div>模拟抽牌模式</div>}

        {/* 数字抽牌模式 */}
        {mode === "number" && (
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <input
                type="text"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder="例如: 3 25 67"
            />
            <button
                onClick={() => {
                const nums = (numberInput.match(/\d+/g) || [])
                    .map((n) => parseInt(n, 10))
                    .filter((n) => !isNaN(n) && n >= 1 && n <= 78);

                const uniqueNums = [...new Set(nums)].slice(0, spread.count);
                if (uniqueNums.length !== spread.count) {
                    alert(`请输入 ${spread.count} 个有效且不重复的数字`);
                    return;
                }

                const selected = uniqueNums.map((n) => ({
                    name: `牌${n}`,
                    revealed: false,
                }));

                setChosenCards(selected);
                }}
                //disabled={chosenCards.length > 0}
            >
                抽牌
            </button>
            </div>
        )}

        {/* 抽到的牌 */}
        {chosenCards.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
            <h3>抽到的牌</h3>
            {renderCards(chosenCards, setChosenCards)}

            <button
                onClick={() => setRevealed(true)}
                style={{
                display: revealed ? "none" : "",
                marginTop: "1rem",
                }}
            >
                一键翻转
            </button>
            </div>
        )}

        {/* 完成按钮 */}
        {revealed && (
            <div style={{ marginTop: "1rem" }}>
            <button onClick={() => onDone(chosenCards)}>完成并查看解读</button>
            </div>
        )}
        </div>
    );
}
