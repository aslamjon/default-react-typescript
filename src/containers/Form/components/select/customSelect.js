import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { get, head, includes, isArray, isEmpty, isNull, isNumber, last } from "lodash";
import { Col, Row } from "react-grid-system";
import Label from "components/label";
import errorImg from "assets/icons/error2.svg";
import Select from "components/select/Select";

const CustomSelect = ({
	register,
	name = "",
	errors,
	params,
	property,
	defaultValue = "",
	getValues,
	watch,
	hideLabel,
	disabled,
	label,
	setValue,
	getValueFromField = () => {},
	colClassName = "",
	rowClassName = "",
	hideError = false,
	cols = [12, 12],
	labelRequired,
	options = [],
	className = "",
	action,
	placeholder = "",
	onChange = () => "",
	clearErrors,
	isMulti,
	...rest
}) => {
	const [, setRender] = useState(false);
	useEffect(() => {
		if (isMulti) {
			if (!isEmpty(defaultValue) && !isNull(defaultValue)) {
				setValue(name, defaultValue);
			} else if (isNull(defaultValue)) {
				setValue(name, []);
			}
		} else if (!isEmpty(defaultValue) || isNumber(defaultValue)) {
			setValue(name, isArray(defaultValue) ? head(defaultValue) : defaultValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue]);

	const isError = () => get(errors, name) && isEmpty(getValues(name));

	if ((!isEmpty(getValues(name)) || isNumber(getValues(name))) && get(errors, name)) clearErrors(name);

	let temp = {};
	if (isEmpty(getValues(name))) temp = { ref: undefined };

	return (
		<div className={className}>
			<Row className={rowClassName}>
				{!hideLabel && (
					<Col xs={head(cols)}>
						<Label htmlFor={name} className="form-label">
							{label} {labelRequired && <span style={{ color: "red" }}>*</span>}
						</Label>
					</Col>
				)}
				<Col className={colClassName} xs={last(cols)}>
					<div className={`form-select-container`}>
						<Select
							ref={register(name, params)}
							className="form-select-container-select"
							onChange={(data, value) => {
								if (isNull(data) && getValues(name)) {
									setValue(name, data);
								}
								setRender((s) => !s);
								setValue(name, data);
								onChange(data, value);
								getValueFromField(data, name);
							}}
							error={isError()}
							value={getValues(name)}
							{...{
								...rest,
								action,
								name,
								defaultValue,
								placeholder,
								disabled,
								options,
								isMulti,
								...temp,
							}}
						/>
					</div>
					{!hideError && isError() && (
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ messages = `${label} is required` }) => {
								let isThereDot = includes(name, ".");
								if (isThereDot) {
									if (get(errors, `${name}.type`) === "required") {
										messages = `${label} is required`;
									}
									if (get(errors, `${name}.type`) === "pattern") {
										messages = `${label} is not valid`;
									}
									if (get(errors, `${name}.type`) === "manual") {
										messages = `${label} ${errors[name].message}`;
									}
								} else {
									if (errors[name].type === "required") {
										messages = `${label} is required`;
									}
									if (errors[name].type === "pattern") {
										messages = `${label} is not valid`;
									}
									if (errors[name].type === "manual") {
										messages = `${label} ${errors[name].message}`;
									}
								}
								return (
									<small className="form-error-message">
										<img src={errorImg} alt="" /> {messages}
									</small>
								);
							}}
						/>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default CustomSelect;
