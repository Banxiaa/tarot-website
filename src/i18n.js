import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 这里先放两种语言的翻译
const resources = {
  en: {
    translation: {
      intro: {
        title: "⚠️ Instructions & Disclaimer",
        disclaimer1: "This app is for entertainment purposes only.",
        disclaimer2: "Do not rely on the results as the sole basis for important decisions.",
        processTitle: "How to Use",
        process1: "Enter your question (max 100 chars).",
        process2: "System generates spread and shows card positions.",
        process3: "Input numbers (1–78) to draw cards.",
        process4: "Click 'View Reading' to see interpretation.",
        privacyTitle: "Privacy & Safety",
        privacy: "This app does not store, collect, or share any user data.",
        start: "Start",
      }
    }
  },
  zh: {
    translation: {
      intro: {
        title: "⚠️ 使用说明与免责声明",
        disclaimer1: "本应用仅供娱乐与个人兴趣参考，不具备专业占卜、心理咨询或医疗建议功能。",
        disclaimer2: "请勿将结果作为重大决策的唯一依据。",
        processTitle: "使用流程",
        process1: "在输入框中填写你的问题（100字以内）。",
        process2: "提交后系统生成牌阵并展示牌位含义。",
        process3: "输入数字（1–78）抽取塔罗牌。",
        process4: "点击“查看解读”获得说明。",
        privacyTitle: "隐私与安全",
        privacy: "本应用不会存储、收集或分享任何用户输入的数据。",
        start: "开始使用",
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh", // 默认语言
    interpolation: { escapeValue: false }
  });

export default i18n;
