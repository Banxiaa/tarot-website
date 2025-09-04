import { useState, useMemo } from "react";
const API_BASE = "http://127.0.0.1:8787";

export default function Ask({ question, setQuestion, onSuccess }) {

    const maxCount = 100;
    const unitCount = useMemo(() => countUnits(question), [question]);
    const tooLong = unitCount > maxCount;
    const isEmpty = unitCount === 0;
    const [loading, setLoading] = useState(false);
    async function handleSubmit() {
        if (isEmpty)  { alert("请输入问题描述"); return; }
        if (tooLong)  { alert(`超出上限，请精简到 ${maxCount} 字以内`); return; }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10_000);

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/spread`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({question}),
                signal: controller.signal,
            });

            clearTimeout(timer);

            if(!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if(data?.error) {
                alert(`后端返回错误：${data.error}`);
                return;
            }
            onSuccess(data);
        } catch (error) {
            console.error(error);
            alert("请求超时或出错，请尝试重新提交。");
        } finally {
            setLoading(false);
        }
        
    }

    return (
    <div style={{
        width: "100%", 
        minWidth: "500px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: 8,
    }}>
        <h2>请输入你想要占卜的问题</h2>

            <textarea
                rows={8}
                value={question}
                onChange={(e) => setQuestion(cleanStrict(e.target.value))}
                placeholder="请在 100 字以内描述你的问题, 例如：我最近运势如何？"
                style={{
                    width: "100%",
                    padding: ".75rem",
                    borderRadius: 6,
                    border: `1px solid ${tooLong ? "#e00" : "#ccc"}`,
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                    minHeight: "200px",
                    maxHeight: "400px",
                }}
            />
        <div style={{ marginTop: ".5rem", color: tooLong ? "#e00" : "#666" }}>
            当前字数：{unitCount} / {maxCount} {tooLong && "（超出上限）"}
        </div>

        <button 
            onClick={handleSubmit}
            disabled={loading || tooLong || isEmpty}
            style={{
                marginTop: ".5rem",
                padding: ".5rem 1rem",
                borderRadius: 6,
                border: "1px solid #333",
                background: loading || tooLong || isEmpty ? "#ddd" : "#111",
                color: loading || tooLong || isEmpty ? "#666" : "#fff",
                cursor: loading || tooLong || isEmpty ? "not-allowed" : "pointer",
            }}       
        >
            {loading ? "正在提交..." : "提交问题"}
        </button>

    </div>

    



    );
}



function countUnits(text) {
    if (!text) return 0;


    const originalLength = text.length;

    // 中文字数
    const chineseCount = (text.match(/[\u4E00-\u9FFF]/g) || []).length;

    // 英文单词数
    const englishWords = text
        .replace(/[\u4E00-\u9FFF]/g, " ")
        .trim()
        .match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];

    const totalLength = chineseCount * 9 + englishWords.length * 3 + originalLength;

    if (totalLength > 1000) {
        return Infinity; // 直接视为超长，可以用 Infinity 或者返回特定标记
    }


    return chineseCount + englishWords.length;
}

function cleanStrict(text) {
  if (!text) return "";

  // 允许的字符范围：
  // \u4e00-\u9fa5 : 中文
  // a-zA-Z0-9 : 英文和数字
  // \u3000-\u303F : 中文标点
  // \uFF00-\uFFEF : 全角符号
  // \u2000-\u206F : 常用符号
  // \u0020-\u007E : 基本 ASCII 可见字符
  const regex = /[^\u4e00-\u9fa5a-zA-Z0-9\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F\u0020-\u007E]/g;

  return text.replace(regex, "");
}
