import React from "react";
import { Input } from "./components/input";
import FormConsumer from "../../context/form/FormConsumer";
import { Checkbox } from "./components/checkbox";
import CustomSelect from "./components/select/customSelect";
import VerificationCodeInput from "./components/verification-code-input/verification-code";

const Field = ({ type, ...rest }) => {
	return (
		<>
			{((type) => {
				switch (type) {
					case "input":
						return (
							<FormConsumer>{({ attrs, getValueFromField }) => <Input {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>
						);

					case "select":
						return (
							<FormConsumer>
								{({ attrs, getValueFromField }) => <CustomSelect {...rest} {...attrs} getValueFromField={getValueFromField} />}
							</FormConsumer>
						);

					case "checkbox":
						return (
							<FormConsumer>{({ attrs, getValueFromField }) => <Checkbox {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>
						);

					case "verification":
						return <FormConsumer>{({ attrs }) => <VerificationCodeInput {...rest} {...attrs} />}</FormConsumer>;

					default:
						return <FormConsumer>{({ attrs }) => <Input {...rest} {...attrs} />}</FormConsumer>;
				}
			})(type)}
		</>
	);
};

export default Field;
