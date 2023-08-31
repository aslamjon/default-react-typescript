import React, { useEffect, memo } from "react";
import styled, { css } from "styled-components";
import Checkbox2 from "rc-checkbox";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { isBoolean, isNil, get, isNull } from "lodash";
import errorImg from "../../../../assets/icons/error2.svg";
import Button from "components/Button";

const StyledCheckbox = styled.div`
	.rc-checkbox {
		height: 15px;
		&:hover {
			.rc-checkbox-inner {
				border: 1px solid #777e91;
				&:hover {
					border: 1px solid #777e91;
				}
			}
		}
		.rc-checkbox-inner {
			width: 15px;
			height: 15px;
			background: none;
			border: 1px solid #777e91;
			transition: 0.2s;
			&:hover {
				border: 1px solid #777e91;
			}
			&:after {
				top: 1px;
				left: 4px;
				width: 5px;
				height: 8px;
				opacity: 0;
				transition: 0.3s;
			}
			${({ sm }) =>
				sm &&
				css`
					width: 14px;
					height: 14px;
					&:after {
						top: 3px;
						left: 5px;
						width: 4px;
					}
				`}

			${({ md }) =>
				md &&
				css`
					width: 18px;
					height: 18px;
					&:after {
						top: 3px;
						left: 6.2px;
						width: 5px;
						height: 10px;
					}
				`}
		}
		&.rc-checkbox-checked {
			.rc-checkbox-inner {
				border: none;
				background: #45b36b;
				&:after {
					opacity: 1;
				}
				&:hover {
					border: none;
				}
			}
		}
	}
	.checkbox-with-button {
		gap: 5px;
		display: flex;
		align-items: center;
		padding: 5px 8px;
		button {
			&:hover {
				color: #353945;
			}
		}
	}
	.disabled {
		.checkbox-with-button {
			button {
				color: #b1b5c3;
			}
		}
	}
	${({ switchBtn }) =>
		switchBtn &&
		css`
			input {
				width: 40px;
				height: 21px;
			}
			.rc-checkbox {
				height: 21px;
				width: 40px;
				.rc-checkbox-inner {
					box-sizing: border-box;
					width: 40px;
					height: 21px;
					border: 1.6px solid #b1b5c4;
					border-radius: 32px;
					transition: 0.2s;
					&:after {
						transform: rotate(0deg);
						top: 8%;
						left: 2px;
						bottom: 2px;
						width: 15px;
						height: 15px;
						border-radius: 50%;
						border: none;
						transition: 0.5s;
						background-color: #b1b5c3;
					}
				}
				&.rc-checkbox-checked {
					.rc-checkbox-inner {
						border: 1.6px solid #45b26b;
						background: #45b26b;
						&:after {
							right: 2px;
							left: 20px;
							background-color: #fcfcfd;
						}
					}
				}
			}
		`}

	${({ disabled }) => disabled && css``}

  label {
		white-space: nowrap;
	}
`;
const Checkbox = ({
	Controller,
	control,
	register,
	name,
	errors,
	params,
	property,
	defaultValue,
	isChangeDefaultValue = false,
	leftLabel = false,
	//   switch_btn = false,
	label,
	setValue,
	inBtn,
	getValues,

	watch = () => {},
	onChange = () => {},
	getValueFromField = () => {},
	disabled = false,
	className = "",
	emptyWhenBeDisabled = false,
	clearErrors,
	...rest
}) => {
	useEffect(() => {
		if (getValues(name) === undefined && !isBoolean(defaultValue)) {
			setValue(name, false);
			isChangeDefaultValue && onChange(defaultValue);
		} else if (getValues(name) !== defaultValue && !isNil(defaultValue)) {
			isChangeDefaultValue && onChange(defaultValue);
			setValue(name, defaultValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {}, [watch(name)]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getValues(name) === "" && setValue(name, false), [getValues(name)]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => emptyWhenBeDisabled && setValue(name, false), [disabled]);

	if (get(errors, name) && get(params, "required", false)) clearErrors(name);

	return (
		<StyledCheckbox
			{...rest}
			className={classNames("form-checkbox-controler", {
				[className]: className,
				disabled: disabled,
			})}
		>
			<Controller
				as={Checkbox2}
				control={control}
				name={name}
				rules={params}
				render={({ field }) => (
					<div
						style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
						className="form-checkbox"
						onClick={() => {
							if (!disabled) {
								let check = !getValues(name);
								setValue(name, check);
								onChange(check, name);
								getValueFromField(check, name);
							}
						}}
					>
						{inBtn ? (
							<Button lightButton className="checkbox-with-button" hideClickAnimation={disabled}>
								{leftLabel && label}
								<Checkbox2 id={"checkbox"} {...field} checked={getValues(name)} disabled={disabled} /> {!leftLabel && label}
							</Button>
						) : (
							<>
								<Checkbox2
									id={"checkbox"}
									{...(isNull(getValues(name)) ? { className: "null" } : {})}
									// {...field}
									checked={getValues(name)}
									disabled={disabled}
									onChange={(e) => {
										if (!disabled) {
											// setValue(name, e.target.checked);
											// // setChecked(state => !state);
											// onChange(e.target.checked);
										}
									}}
								/>{" "}
								{label}
							</>
						)}
					</div>
				)}
			/>
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ messages = `${label} is required` }) => {
					return (
						<small className="form-error-message">
							<img src={errorImg} alt="" /> {messages}
						</small>
					);
				}}
			/>
		</StyledCheckbox>
	);
};

export default memo(Checkbox);
