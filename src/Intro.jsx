import { useTranslation } from "react-i18next";

export default function Intro({ startApp }) {
    const { t } = useTranslation();

    return (
        <div style={{ padding: "1em", border: "1px solid #ccc", marginBottom: "1em" }}>
            <h2>{t("intro.title")}</h2>
            <p>{t("intro.disclaimer1")}</p>
            <p>{t("intro.disclaimer2")}</p>

            <h3>{t("intro.processTitle")}</h3>
            <ol>
            <li>{t("intro.process1")}</li>
            <li>{t("intro.process2")}</li>
            <li>{t("intro.process3")}</li>
            <li>{t("intro.process4")}</li>
            </ol>

            <h3>{t("intro.privacyTitle")}</h3>
            <p>{t("intro.privacy")}</p>

            <button onClick={startApp}>{t("intro.start")}</button>
        </div>
    );
}
