import React, { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import Styled from "./Style";
import { request } from "services/api";
import { withTranslation } from "react-i18next";
import { setTokens } from "../authSlice";
import { useAppDispatch } from "services/hooks";
import { toast } from "react-toastify";
import Form from "containers/Form/form";
import Button from "components/Button/button";
import { isNum } from "utils";

const Verification = ({ t }: { t: (value: string) => "" }) => {
	const { data } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const smsCode = useRef("");

	const onFinish = useCallback(
		() => {
			if (isNum(smsCode.current) && smsCode.current.length !== 6) return toast.error(t("please_enter_sms_code") ?? "please enter sms code");
			const { type, phoneNumber, password, smsCodeId, confirmPassword, firstName, lastName } = JSON.parse(atob(data ?? ""));

			request({
				url: type === "login" ? "auth/v1/auth/sign-in" : type === "forgot" ? "auth/v1/auth/verify-forgot-sms-code" : "auth/v1/auth/sign-up",
				method: "post",
				body: {
					phoneNumber,
					password,
					smsCodeId,
					smsCode: smsCode.current,
					confirmPassword,
					firstName,
					lastName,
				},
				success: ({ accessToken, refreshToken, tokenType }: { accessToken: string; refreshToken: string; tokenType: string }) => {
					if (type === "forgot") return navigate(`/forgot-password/${btoa(JSON.stringify({ smsCode: smsCode.current, phoneNumber, smsCodeId }))}`);
					dispatch(setTokens({ accessToken, refreshToken, tokenType }));
					navigate("/");
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data]
	);

	return (
		<Styled>
			<Form formRequest={onFinish}>
				<ReactInputVerificationCode autoFocus length={6} onCompleted={(v) => (smsCode.current = v)} />
				<Button type="submit" success className="login-form-button">
					{t("next") ?? "next"}
				</Button>
			</Form>
		</Styled>
	);
};

export default withTranslation()(Verification);
