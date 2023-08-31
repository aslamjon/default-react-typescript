import { tProps } from "interfaces";
import { useCallback } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "services/api";
import Style from "./Style";
import Form from "containers/Form/form";
import Field from "containers/Form/field";
import Button from "components/Button";

const LoginOrSignup = ({ t }: tProps) => {
	const navigate = useNavigate();

	// TODO: request login
	const onFinish = useCallback(({ data: { phoneNumber } }: { data: { phoneNumber: string } }) => {
		const phoneNumberRegex = /^\d{12}$/;

		if (!phoneNumberRegex.test(phoneNumber)) {
			// form.resetFields();
			return toast.error(t("this_is_not_number") ?? "this is not number");
		}
		request({
			url: "auth/v1/auth/check-phone",
			method: "post",
			body: { phoneNumber },
			success: ({ registered }: { registered: boolean }) => {
				if (registered) navigate(`/login/${btoa(phoneNumber)}`);
				else {
					// toast.error(t("this_number_is_not_our_user") ?? "this number is not our user");
					navigate(`/sign-up/${btoa(phoneNumber)}`);
				}
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Style>
			<Form formRequest={onFinish}>
				<Field
					type="input"
					label={t("please_enter_your_phone_number") ?? "Please enter your phone number"}
					name="phoneNumber"
					defaultValue="998"
					property={{ type: "number" }}
					minLength={7}
					maxLength={12}
				/>
				<Button success type="submit">
					{t("next") ?? "next"}
				</Button>
			</Form>
			{/* <Form name="basic" form={form} initialValues={{ phoneNumber: "998" }} onFinish={onFinish} autoComplete="off" layout="vertical">
				<h2>{t("admin_admin_login") ?? "log in to get started"}</h2>

				<Flex align={"center"} justify={"center"} gap="10px">
					<Form.Item
						name="phoneNumber"
						rules={[{ required: true, message: (t("admin_admin_please_input_your_phoneNumber") ?? "please_input_your_phoneNumber") + "!" }]}
					>
						<Input
							type="tel"
							minLength={7}
							maxLength={12}
							prefix={<PhoneOutlined className="site-form-item-icon" />}
							placeholder={t("admin_admin_phoneNumber") ?? "phoneNumber"}
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							{t("admin_admin_next") ?? "next"}
						</Button>
					</Form.Item>
				</Flex>
			</Form> */}
		</Style>
	);
};

export default withTranslation()(LoginOrSignup);
