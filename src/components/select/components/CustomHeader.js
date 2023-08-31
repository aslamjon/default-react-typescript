import React, { memo, useState } from "react";
import { get, isArray, isEmpty } from "lodash";
import CustomMultiHeader from "./CustomMultiHeader";

const getLabelByValueForSelect = ({ options, val, valueKey, labelKey }) => {
	val = isArray(val) ? val[0] : val;
	if (isArray(options) && val) {
		let res = options.find((item) => item[valueKey] === val);
		return get(res, labelKey, res);
	}
	return "";
};

const CustomHeader = ({
	isMulti,
	maxShowSelected,
	selected,
	defaultValue,
	placeholder,
	CustomIcon,
	options,
	isClearAll,
	clearAll,
	valueKey,
	clickHeader,
	labelKey,
	headerTitle,
}) => {
	const [autoSelectedCount, setAutoSelectedCount] = useState(0);

	const getValue = (val) => {
		let res = getLabelByValueForSelect({
			options,
			val,
			valueKey,
			labelKey,
		});
		if (isEmpty(res)) return <span className="select__header__content__placeholder">{placeholder}</span>;
		return res;
	};

	return (
		<>
			<div onClick={clickHeader} className={`select__header__content ${isMulti && "multi"}`}>
				<div className="select__header__content__text">
					{headerTitle ? (
						<span className="select__header__content__placeholder">{headerTitle}</span>
					) : !isEmpty(`${selected}`) ? (
						isMulti ? (
							<CustomMultiHeader
								{...{
									data: selected,
									maxShowSelected,
									options,
									valueKey,
									labelKey,
									setAutoSelectedCount,
								}}
							/>
						) : (
							getValue(get(selected, valueKey))
						)
					) : !isEmpty(defaultValue) ? (
						isMulti ? (
							<CustomMultiHeader
								{...{
									data: defaultValue.slice(0, maxShowSelected),
									maxShowSelected,
									options,
									valueKey,
									labelKey,
									setAutoSelectedCount,
								}}
							/>
						) : (
							getValue(defaultValue)
						)
					) : (
						<span className="select__header__content__placeholder">{placeholder}</span>
					)}
				</div>
			</div>
			{CustomIcon && (
				<CustomIcon
					{...{
						isMulti,
						selected,
						isClearAll,
						clearAll,
						maxShowSelected: maxShowSelected || autoSelectedCount,
						clickHeader,
					}}
				/>
			)}
		</>
	);
};

export default memo(CustomHeader);
