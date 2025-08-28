import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [stage, setStage] = useState("intro");
  let content;
  if (stage === "intro"){
    content = <Intro startApp={() => setStage("ask")}/>;
  }

  return (
    <>
      {content}
    </>
  )
}

export default App

function Intro({startApp}){
  return (<>
          <div style={{ padding: "1em", border: "1px solid #ccc", marginBottom: "1em" }}>
          <h2>⚠️ 使用说明与免责声明</h2>
          <p>本应用仅供娱乐与个人兴趣参考，不具备专业占卜、心理咨询或医疗建议功能。</p>
          <p>请勿将结果作为重大决策的唯一依据。</p>
          <h3>使用流程</h3>
          <ol>
            <li>在输入框中填写你的问题（100字以内）。</li>
            <li>提交后系统生成牌阵并展示牌位含义。</li>
            <li>输入数字（1–78）抽取塔罗牌。</li>
            <li>点击“查看解读”获得说明。</li>
          </ol>
          <h3>隐私与安全</h3>
          <p>本应用不会存储、收集或分享任何用户输入的数据。</p>
          <button onClick={startApp}>开始使用</button>
        </div>
  </>)
}