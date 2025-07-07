import { useTranslation } from "react-i18next";
import components from "../../../components/index";

import { useState, useEffect } from "react";
import useSendTimer from "../../../hooks/useSendTimer";
import useVerifyCode from "../../../hooks/useVerifyCode";

export default function Verify() {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(0);
    const { handleResendCode, handleVerifyCode, handleGetVerifyUsers } = useVerifyCode();
    const [resendDisabled, setResendDisabled] = useState(false);

    useSendTimer(setTimer, resendDisabled, setResendDisabled);

    useEffect(() => {
        handleGetVerifyUsers(setEmail)
    }, [])


    return (
        <form className="form-login"
              onSubmit={(e) => handleVerifyCode(e, email, code, setResendDisabled)}>
            <article className="form-article">
                <h2>{t("formTitle")}</h2>
                <p>{t("formUnderTitle")}</p>
            </article>
            <div className="form-inside-container">
                <section className="form-inside-container-left">
                    <h1>{t("verify")}</h1>
                    <section className="form-inputs-container">
                        <components.Input
                          type={"email"}
                          holder={t("userMail")}
                          value={email}
                          func={(e) => setEmail(e.target.value)}
                          complete={"email"}
                          required
                        />
                        <components.Input
                          holder={t("code")}
                          value={code}
                          func={(e) => setCode(e.target.value)}
                          complete={"one-time-code"}
                          required
                        />
                    </section>
                    <section className="form-section-buttons">
                        <components.Button
                          onClick={() => handleResendCode(email, setResendDisabled)}
                          disabled={resendDisabled}
                          className={"form-button"}>
                            {resendDisabled ? `${t("resendCode")} (${timer})` : t("resendCode")}</components.Button>
                        <components.Button
                          type={"submit"}
                          className={"form-button"}>{t("confirm")}</components.Button>
                    </section>
                </section>
            </div>
        </form>
    );
}