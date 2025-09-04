import './App.css'
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Intro from "./Intro";
import Ask from "./Ask";
import Spread from "./Spread";

function App() {
    const [stage, setStage] = useState("intro");
    const [question, setQuestion] = useState("");
	const [spread, setSpread] = useState(null);
	const [chosenCards, setChosenCards] = useState([]);
    const { i18n } = useTranslation();

    // 切换语言函数
    const toggleLang = () => {
      	i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
    };

    return (
		<div>
			{/* 🔹 全局语言切换按钮 */}
			<div style={{
				position: "fixed",
				top: "10px",
				right: "10px",
				zIndex: 1000
			}}>
			<button onClick={toggleLang}>
				{i18n.language === "zh" ? "English" : "中文"}
			</button>
			</div>

			{/* 🔹 根据阶段渲染不同内容 */}
			{stage === "intro" && <Intro startApp={() => setStage("ask")} />}
			{stage === "ask" && <Ask question={question} setQuestion={setQuestion} onSuccess={(spread) => {
				console.log("✅ 收到后端 JSON：", spread);
				setSpread(spread);
				setStage("spread"); // 先切到下一阶段，暂时只是占位
			}}/>}
			{stage === "spread" && <Spread spread={spread} question={question} chosenCards={chosenCards} setChosenCards={setChosenCards} onDone={() => {
				console.log("完成spread抽取");
				setStage("interpret");
			}}/>}
			{stage === "interpret" && <div>interpret stage</div>}

		</div>
    );
}

export default App;
