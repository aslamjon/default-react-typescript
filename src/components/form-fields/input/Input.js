import classNames from "classnames";
import { get } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import eye2Img from "assets/icons/eye2.svg";

const StyledInput = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: var(--input-light);
	border: 1px solid var(--border);
	border-radius: 8px;
	height: 44px;
	position: relative;
	overflow: hidden;

	${({ error, focused }) =>
		(error || focused) &&
		css`
			border-color: ${error ? "var(--danger)" : "var(--success)"};
		`}

	${({ magic, type, isOpen, isFocused }) =>
		type === "password" &&
		!isOpen &&
		css`
			&:after {
				content: "${magic}";
				height: 100%;
				width: 98%;
				overflow: hidden;
				position: absolute;
				top: 1px;
				left: 1px;
				display: flex;
				align-items: center;
				padding: ${isFocused || !isOpen ? "0px 12px 0px 12px" : "0px 12px"};
				font-size: 18px;
				background: var(--input-light);
				z-index: 1;
			}
		`}

  .input {
		font-size: 14px;
		padding: 12px;
		outline: none;
		border: none;
		width: 100%;
		height: 100%;
		color: var(--input-text);
		font-weight: 400;
		font-family: "Poppins", sans-serif;
		background: none;
		&::placeholder {
			color: #b1b5c4;
		}
		appearance: none !important;
		-moz-appearance: none !important;
		-webkit-appearance: none !important;
		&:autofill,
		&:-internal-autofill-selected,
		&:webkit-autofill {
			background: none !important;
			&:active,
			&:hover,
			&:focus {
				background: none !important;
			}
		}
		&[type="password"] {
			opacity: ${({ magic }) => (magic ? 0 : 1)};
			z-index: 2;
			&:focus {
				&::placeholder {
					opacity: 0;
				}
			}
		}
		&[disabled] {
			cursor: default;
		}
	}
	.eye {
		width: 30px;
		min-width: 30px;
		height: 30px;
		background: rgba(244, 245, 246, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		transition: 0.2s;
		cursor: pointer;
		margin: 0 12px;
		z-index: 2;
		&:hover {
			background: rgba(240, 240, 240, 1);
		}
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #fcfcfd inset;
		box-shadow: 0 0 0 30px #fcfcfd inset;
		border-radius: 10px;
	}

	input[type="number"] {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		-moz-appearance: textfield;
	}
	@font-face {
		font-family: "fontello";
		src: "&#65121";
		font-weight: normal;
		font-style: normal;
	}
`;

const Input = ({ register, className, onChange, defaultValue, isError, disabled, name, property, placeholder, value, params, ...rest }) => {
	const [{ error, focused, isOpen }, setState] = useState({});

	useEffect(() => {
		if (isError !== error) {
			setState((s) => ({ ...s, error: isError }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);

	const onChangeHandling = (e) => {
		const val = e.target.value;
		if (get(property, "type") === "number") {
			if (checkNum(val) || val === "") onChange(val);
		} else if (get(property, "type") === "tel") {
			let pattern = /^\d+$/;
			if (pattern.test(val)) onChange(val);
		} else if (get(property, "type") === "email") {
			onChange(val);
			if (/.+@.+\.[A-Za-z]+$/.test(val)) setState((s) => ({ ...s, isError: false }));
			else setState((s) => ({ ...s, isError: true }));
		} else onChange(val);
	};

	function checkNum(num) {
		let two = new RegExp(/^.{0,15}$/);
		let one = new RegExp(/^[0-9]+([.][0-9]+)?$/);
		return one.test(num) && two.test(num);
	}

	// const onChangeCurrencyInput = (e) => {
	// 	let value = e.target.value;
	// 	let val = "";
	// 	value.split("").forEach((v) => {
	// 		if (!isNaN(Number(v))) val += v;
	// 		val = val.trim();
	// 	});
	// 	if (isNaN(Number(val))) onChange(null);
	// 	onChange(val);
	// };

	const getInputType = useCallback((type) => {
		if (type === "number") return "text";
		return type;
	}, []);

	const replaceStar = (value) => "*".repeat(String(value).length);

	const eyeHandling = () => setState((state) => ({ ...state, isOpen: !state.isOpen }));

	return (
		<StyledInput
			{...{
				disabled,
				magic: replaceStar(value || ""),
				error,
				focused,
				isOpen,
				type: getInputType(get(property, "type", "text")),
			}}
			className={classNames("input-container", { disabled, error, focused: true })}
		>
			{
				<input
					name={name}
					{...property}
					{...register}
					className="input"
					readOnly={get(property, "disabled")}
					placeholder={get(property, "placeholder", placeholder)}
					type={isOpen ? "text" : getInputType(get(property, "type", "text"))}
					onChange={onChangeHandling}
					autoComplete="off"
					value={value}
					onFocus={(e) => {
						setState((state) => ({
							...state,
							focused: true,
						}));
						get(property, "onFocus", () => {})(e);
					}}
					onBlur={(e) => {
						setState((state) => ({
							...state,
							focused: false,
						}));
						get(property, "onBlur", () => {})(e);
					}}
				/>
			}
			{get(property, "type") === "password" && (
				<div className="eye" onClick={eyeHandling}>
					<img src={eye2Img} alt="eye2" />
				</div>
			)}
		</StyledInput>
	);
};

export default Input;
