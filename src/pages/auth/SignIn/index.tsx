import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Style from "./Style";
import { request } from "services/api";
import { tProps } from "interfaces";
import { tryCatch } from "utils";
import Form from "containers/Form/form";
import Field from "containers/Form/field";
import Button from "components/Button/button";

const SignIn = ({ t }: tProps) => {
	const { phoneNumber } = useParams();
	const navigate = useNavigate();
	// TODO: request login
	const onFinish = useCallback(({ data }: { data: any }) => {
		request({
			url: "auth/v1/auth/verify-password",
			method: "post",
			body: {
				phoneNumber: atob(phoneNumber ?? ""),
				...data,
			},
			success: ({ smsCodeId }: { smsCodeId: string }) => {
				navigate(
					`/verification/${btoa(JSON.stringify({ phoneNumber: tryCatch(() => atob(phoneNumber ?? "")), ...data, smsCodeId, type: "login" }))}`
				);
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const clickForgotPassword = useCallback(() => {
		const newPhoneNumber = atob(phoneNumber ?? "");
		request({
			url: "auth/v1/auth/verify-phone-number",
			method: "post",
			body: { phoneNumber: newPhoneNumber },
			success: ({ smsCodeId }: { smsCodeId: string }) => {
				navigate(
					`/verification/${btoa(
						JSON.stringify({
							phoneNumber: newPhoneNumber,
							smsCodeId,
							type: "forgot",
						})
					)}`
				);
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phoneNumber]);

	return (
		<Style>
			<Form formRequest={onFinish}>
				<Field
					type="input"
					name="password"
					property={{ type: "password", required: true }}
					// hideLabel
					label={(t("please_input_your_password") ?? "please input your password") + "!"}
				/>
				<div onClick={clickForgotPassword} className="login-form-forgot">
					{t("forgot_password") ?? "forgot password"}
				</div>
				<Button success type="submit">
					{t("log_in") ?? "log in"}
				</Button>
			</Form>
			{/* <Form name="basic" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
				<Form.Item
					name="password"
					rules={[{ required: true, message: (t("admin_please_input_your_password") ?? "please_input_your_password") + "!" }]}
				>
					<Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t("admin_password") ?? "password"} />
				</Form.Item>

				<Flex justify={"space-between"}>
					<Form.Item>
						<div onClick={clickForgotPassword} className="login-form-forgot">
							{t("admin_forgot_password") ?? "forgot_password"}
						</div>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							{t("admin_log_in") ?? "log_in"}
						</Button>
					</Form.Item>
				</Flex>
			</Form> */}
		</Style>
	);
};

export default withTranslation()(SignIn);
