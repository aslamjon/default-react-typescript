import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { get } from "lodash";
import { request } from "services/api";
import { tProps } from "interfaces";
import { tryCatch } from "utils";
import Style from "./Style";
import { toast } from "react-toastify";
import Form from "containers/Form/form";
import Field from "containers/Form/field";
import Button from "components/Button/button";

const SignUpPage = ({ t }: tProps) => {
	const { phoneNumber } = useParams();

	const navigate = useNavigate();
	// TODO: request login
	const onFinish = useCallback(
		({ data }: { data: any }) => {
			if (get(data, "confirmPassword") !== get(data, "password")) return toast.error(t("password_not_valid") ?? "password not valid");
			request({
				url: "auth/v1/auth/verify-creating-user",
				method: "post",
				body: {
					phoneNumber: atob(phoneNumber ?? ""),
					...data,
				},
				success: ({ data: { smsCodeId } }: { data: { smsCodeId: string } }) => {
					navigate(
						`/verification/${btoa(
							JSON.stringify({
								phoneNumber: tryCatch(() => atob(phoneNumber ?? "")),
								smsCodeId,
								type: "signup",
								...data,
							})
						)}`
					);
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[phoneNumber]
	);

	return (
		<Style>
			<Form formRequest={onFinish}>
				<div className="title">{t("please_register_before_entering") ?? "Please register before entering"}</div>
				<Field
					type="input"
					name="firstName"
					property={{ required: true }}
					label={(t("please_input_your_firstName") ?? "please input your firstName") + "!"}
				/>
				<Field
					type="input"
					name="lastName"
					property={{ required: true }}
					label={(t("please_input_your_lastName") ?? "please input your lastName") + "!"}
				/>
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
					label={(t("please_input_your_confirm_password") ?? "please input your confirm password") + "!"}
				/>

				<Button success type="submit">
					{t("sign_up") ?? "sign up"}
				</Button>
			</Form>
		</Style>
	);
};

export default withTranslation()(SignUpPage);
