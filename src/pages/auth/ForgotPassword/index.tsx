import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { request } from "services/api";
import { setTokens } from "pages/auth/authSlice";
import { tProps } from "interfaces";
import { useAppDispatch } from "services/hooks";
import Style from "./Style";
import { toast } from "react-toastify";
import Form from "containers/Form/form";
import Field from "containers/Form/field";
import Button from "components/Button/button";

const ForgotPassword = ({ t }: tProps) => {
	const { data } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// TODO: request login
	const onFinish = useCallback(
		({ data: { password, confirmPassword } }: { data: { password: string; confirmPassword: string } }) => {
			if (confirmPassword !== password) return toast.error(t("password_not_valid") ?? "password not valid");

			const { phoneNumber, smsCodeId, smsCode } = JSON.parse(atob(data ?? ""));
			request({
				url: "auth/v1/auth/forgot-password",
				method: "post",
				body: {
					phoneNumber,
					smsCodeId,
					smsCode,
					password,
				},
				success: ({ accessToken, refreshToken, tokenType }: { accessToken: string; refreshToken: string; tokenType: string }) => {
					dispatch(setTokens({ accessToken, refreshToken, tokenType }));
					navigate("/");
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data]
	);

	return (
		<Style>
			<Form formRequest={onFinish}>
				<Field
					type="input"
					name="password"
					property={{ type: "password", required: true }}
					label={(t("please_input_your_password") ?? "please input your password") + "!"}
				/>
				<Field
					type="input"
					name="confirmPassword"
					property={{ type: "password", required: true }}
					label={(t("please_input_your_confirmPassword") ?? "please input your confirmPassword") + "!"}
				/>
				<Button success type="submit">
					{t("log_in") ?? "log in"}
				</Button>
			</Form>
		</Style>
	);
};

export default withTranslation()(ForgotPassword);
