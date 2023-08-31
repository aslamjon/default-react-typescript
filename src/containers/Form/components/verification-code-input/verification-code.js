import React, { useEffect } from "react";
// import OtpInput from "react-otp-input";
import styled from "styled-components";
import { isEmpty } from "lodash";
import OTPInput from "otp-input-react";
import Label from "components/label";
// import { ErrorMessage } from "@hookform/error-message";
// import errorImg from "../../../../assets/icons/error2.svg";
import Flex from "components/Flex";

const StyledVerificationInput = styled.div`
	input {
		width: 49px !important;
		height: 45px !important;
		font-family: "Poppins", sans-serif;
		font-weight: 500;
		font-size: 25px;
		outline: none;
		border: 2px solid ${({ errors }) => (isEmpty(errors) ? "#E6E8EC" : "#EF466F")};
		border-radius: 14px;
		caret-color: transparent;
		background: #fcfcfd;
		&::placeholder {
			font-weight: 400;
		}
		&:focus {
			border: 2px solid #45b36b;
		}
		&:not(:placeholder-shown) {
			border: 2px solid #45b36b;
			animation: none;
			background: none;
			caret-color: black;
		}
	}

	@keyframes blink {
		from,
		to {
			background-size: 0px;
		}
		50% {
			background-size: 14px;
		}
	}
`;

const VerificationCodeInput = ({
	Controller,
	control,
	register,
	name,
	watch,
	getValues,
	setValue,
	errors,
	params,
	property,
	defaultValue,
	label,
	setError,
	hideLabel,
	clearErrors,
	...rest
}) => {
	const handleChange = (otp) => {
		// let value = getValues(name);
		// if (otp === "") setValue(name, value.substring(0, value.length - 1));
		// else setValue(name, otp);
		setValue(name, otp);
	};

	useEffect(() => {
		if (getValues(name)) {
			if (getValues(name).length < 6) setError(name, { type: "required", message: "Error" });
			else clearErrors(name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch(name)]);
	return (
		<StyledVerificationInput {...rest}>
			{!hideLabel && <Label htmlFor={name}>{label}</Label>}
			<Flex justify={"center"}>
				<OTPInput
					value={getValues(name)}
					onChange={handleChange}
					autoFocus
					OTPLength={6}
					otpType="number"
					disabled={false}
					placeholder={["-", "-", "-", "-", "-", "-"]}
				/>
				{/* <Controller
          className={"verification-controller"}
          as={OtpInput}
          control={control}
          name={name}
          defaultValue={defaultValue}
          rules={params}
          render={({ field }) => (
            <OtpInput
              {...field}
              numInputs={get(property, "fields", 6)}
              className={"verification__input"}
              value={getValues(name)}
              onChange={handleChange}
              // separator={<span className="verification__input__separator">-</span>}
              placeholder="      "
            />
          )}
        /> */}
			</Flex>
			{/* <div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages = `${label} is required` }) => {
            if ((errors[name].type = "required")) {
              messages = `${label} is required`;
            } else if ((errors[name].type = "pattern")) {
              messages = `${label} is not valid`;
            }
            return (
              <small className="form-error-message">
                <img src={errorImg} alt="" /> {messages}
              </small>
            );
          }}
        />
      </div> */}
		</StyledVerificationInput>
	);
};

export default VerificationCodeInput;
