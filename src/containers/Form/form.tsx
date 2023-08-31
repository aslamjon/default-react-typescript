import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { isArray, isEmpty } from "lodash";
import FormProvider from "../../context/form/FormProvider";
import { withTranslation } from "react-i18next";
import { childrenType } from "interfaces";
import PropTypes from "prop-types";

export type formCbCallType = {
	getValues: (name: string) => any;
	setValue: (name: string, value: any) => void;
	setFocus: (name: string) => void;
	reset: (values?: Record<string, any>) => void;
};

interface formInterface {
	children?: childrenType;
	formRequest?: ({ data, setError, reset }: { data: any; setError: (name: any, a: any) => void; reset: (name: any) => void }) => void;
	getValueFromField?: () => void;
	onError?: ({ errors }: { errors: any }) => void;
	isFetched?: boolean;
	className?: string;
	isClear?: boolean;
	resetData?: any;
	setValueData?: [{ name: string; value: string }];
	t: (name: string) => string | undefined;
	formCb?: {
		call: (callbacks: formCbCallType) => void;
	};
}

const StyledForm = styled.form`
	.form-group {
		margin-bottom: 30px;
	}

	.form-error-message {
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		display: flex;
		align-items: center;
		color: #ef466f;
		margin-top: 5px;
		margin-bottom: 5px;
	}
`;
const Form = ({
	children,
	formRequest = () => "",
	isFetched,
	getValueFromField = () => {},
	onError = () => {},
	className = "",
	isClear = false,
	resetData,
	setValueData,
	formCb,
	t,
	...rest
}: formInterface) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		getValues,
		setValue,
		watch,
		control,
		reset,
		clearErrors,
		setFocus,
	} = useForm({ mode: "onChange" });

	const onSubmit = (data: any) => {
		formRequest({ data, setError, reset });
		isClear && reset();
	};
	const handleError = (errors: any) => {
		onError({ errors });
	};

	const attrs = {
		Controller,
		register,
		errors,
		control,
		getValues,
		watch,
		setError,
		setValue,
		clearErrors,
		t,
		...rest,
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		!isEmpty(resetData) && reset(resetData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetData]);

	useEffect(() => {
		if (!isEmpty(formCb) && formCb) formCb.call({ getValues, setValue, reset, setFocus });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formCb]);

	useEffect(() => {
		if (!isEmpty(setValueData) && isArray(setValueData)) {
			setValueData.forEach((item) => {
				setValue(item?.name, item?.value);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setValueData]);

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit, handleError)} {...rest} className={className}>
			<FormProvider value={{ attrs, getValueFromField }}>{children}</FormProvider>
		</StyledForm>
	);
};

Form.propTypes = {
	children: PropTypes.node,
	// formRequest?: ({ data, setError, reset }: { data: any, setError: (name: any, a: any) => void, reset: (name: any) => void }) => void,
	formRequest: PropTypes.func,
	getValueFromField: PropTypes.func,
	onError: PropTypes.func,
	isFetched: PropTypes.bool,
	className: PropTypes.string,
	isClear: PropTypes.bool,
	resetData: PropTypes.object,
	setValueData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.string,
		})
	),
	t: PropTypes.func,
	formCb: PropTypes.shape({
		call: PropTypes.func,
	}),
};

Form.defaultProps = {
	children: "",
	formRequest: () => {},
	getValueFromField: () => {},
	onError: () => {},
	t: () => {},
	isFetched: false,
	className: "",
	isClear: false,
	resetData: {},
	setValueData: [],
	formCb: {},
};

export default withTranslation("pdp")(Form);
