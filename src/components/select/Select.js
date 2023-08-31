import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { get, head, includes, isArray, isEmpty, isNil, isNull, isNumber } from "lodash";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import { SelectStyled } from "./styled";
import CustomActionDropDownn from "./components/CustomActionDropDown";
import CustomMultiLabelComponent from "./components/CustomMultiLabel";
import CustomOptionsComponent from "./components/CustomOptions";
import CustomHeaderComponent from "./components/CustomHeader";
import CustomIconComponent from "./components/CustomIcon";
import CustomDropDownIconn from "./components/CustomDropDownIcon";
import { getItemsWithIds } from "utils";

const Select = ({
	checked,
	error,
	onChange = (v) => {},
	onChangeWithoutController = () => {},
	inputOnChange = () => "",
	getActionValue = () => "",
	onClose = () => "",
	options = [],
	headerTitle,
	childClassNames = [],
	defaultValue = {},
	action = {},
	disabledIds = [],
	disabledSomeOptions = [],
	ignoreOption = {},
	otherDataForAction = "",
	maxShowSelected,
	value = "",
	optionTitle = "",
	placeholder = "Select",
	searchPlaceholder = "Type to search...",
	name = "",
	className = "",
	onChangeKey = "value",
	valueKey = "value",
	labelKey = "label",

	editable = true,
	disabled = false,
	isSearchable = true,
	isMulti = false,
	isClearAll = false,
	nullable = true,
	isChangeDefaultValue = true,
	hideRemoveIcon = false,
	defaultHideAnimation = true,
	isFixed = false,
	onChangeCallWhenChangeOptions = false,
	searchKeys = [],

	CustomActionDropDown = CustomActionDropDownn,
	CustomDropDownIcon = CustomDropDownIconn,
	MultiLabel = CustomMultiLabelComponent,
	CustomOption = CustomOptionsComponent,
	CustomHeader = CustomHeaderComponent,
	CustomIcon = CustomIconComponent,

	dropdownConfig,
	actionOptions,
	...props
}) => {
	const [viewSelectOption, setViewSelectOption] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [optionsState, setOptionsState] = useState([]);
	const [selected, setSelected] = useState([]);
	const [optionsDisabled, setOptionsDisabled] = useState(false);
	const [position, setPosition] = useState({});
	const [selectOptionWithArrow, setSelectOptionWithArrow] = useState(0);
	const headerRef = useRef(null);
	const bodyRef = useRef(null);

	const dropDownRef = useRef(null);

	const removeDropDown = useCallback(() => {
		dropDownRef.current.removeAttribute("index");
		dropDownRef.current.removeAttribute("id");
		dropDownRef.current.classList.remove("active");
	}, []);

	const selectHandling = useCallback(
		(val) => {
			let res = isArray(disabledSomeOptions) && !isNull(val) ? disabledSomeOptions.find((item) => get(item, valueKey, "") === val[valueKey]) : [];

			if (editable && !optionsDisabled && (isNull(val) ? true : isNil(res))) {
				if (isMulti) {
					const selectedNew = isArray(selected) ? selected : [];
					selectedNew.push(val);
					let selectedValue = selectedNew.map((item) => item[valueKey]);
					onChange(selectedValue, selectedNew);
					onChangeWithoutController(selectedValue, selectedNew);
					setSelected(selectedNew);
					setOptionsState((s) => s.map((item) => (item[valueKey] === val[valueKey] ? { ...item, isSelected: true } : item)));
				} else {
					if (isNull(val)) {
						onChange(null);
						onChangeWithoutController(null);
						setViewSelectOption(false);
						setSelected({});
						defaultValue && onClose(val);
					} else {
						let selectedValue = get(val, onChangeKey, get(val, valueKey, ""));
						onChange(selectedValue, val);
						onChangeWithoutController(selectedValue, val);
						setViewSelectOption((state) => !state);
						setSelected(val);
						onClose(get(val, onChangeKey, get(val, valueKey, "")), val);
					}
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[disabledSomeOptions, editable, optionsDisabled, isMulti, selected, defaultValue, onChangeKey, valueKey]
	);

	// UNDO FOR X ICONS IN MULTI SELECT
	const undoSelected = useCallback(
		(index) => {
			if (editable) {
				let unSelected = selected[index];
				selected.splice(index, 1);

				if (isMulti) {
					setSelected([...selected]);
					setOptionsState((s) => s.map((item, i) => (item[valueKey] === unSelected[valueKey] ? { ...item, isSelected: false } : item)));
					let selectedValue = selected.map((it) => it[valueKey]);
					onChange(selectedValue, selected);
					onChangeWithoutController(selectedValue, selected);
				} else {
					setSelected({ ...selected });
					onChange(selected);
					onChangeWithoutController(selected);
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[editable, selected, isMulti, valueKey]
	);

	// CLEAR ALL
	const clearAll = useCallback(() => {
		if (isClearAll) {
			onChange([], []);
			onChangeWithoutController([]);
			setSelected([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isClearAll]);

	// SEARCH DOES WORK
	const searchChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			// set value for control in input
			setSearchValue(value);
			if (!optionsDisabled) {
				// search data
				let newOptions = options.filter((val) => {
					for (const key of searchKeys) {
						if (includes(val[key].toLocaleLowerCase(), value.toLocaleLowerCase())) return true;
					}
					return includes(val[labelKey].toLocaleLowerCase(), value.toLocaleLowerCase());
				});
				// set Options for showing display
				if (selectOptionWithArrow !== 0) setSelectOptionWithArrow(0);
				setOptionsState(newOptions);
				inputOnChange(e);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[optionsDisabled, options, labelKey, selectOptionWithArrow]
	);

	// START API
	const createButtonHandling = useCallback(
		(value) => {
			value = value.trim();
			let newOptions = options.filter((val) => val[labelKey].toLocaleLowerCase() === value.toLocaleLowerCase());
			if (isEmpty(newOptions) && get(action, "create", false) && !optionsDisabled && !isEmpty(value)) {
				actionOptions({
					attributes: {
						name: value,
						method: "CREATE",
						// colorCode: colors[Math.floor(Math.random() * colors.length)],
						...otherDataForAction,
					},
					url: action.url,
					cb: {
						success: (res) => {
							let options = get(res, "data", []);
							getActionValue({ options, name });
							if (!isEmpty(options)) {
								// options = getSelectOptionsListFromData(options, "id", "name");
								setOptionsState(options);
							}
						},
						fail: () => setOptionsState(options),
					},
				});
				setSearchValue("");
				setOptionsDisabled(false);
			}
			if (get(action, "edit", false) && optionsDisabled && !isEmpty(value)) {
				actionOptions({
					attributes: {
						name: value,
						id: optionsDisabled,
						method: "EDIT",
						...otherDataForAction,
					},
					url: action.url,
					cb: {
						success: (res) => {
							let options = get(res, "data", []);
							getActionValue({ options, name });
							if (!isEmpty(options)) {
								// options = getSelectOptionsListFromData(options, "id", "name");
								setOptionsState(options);
							}
						},
						fail: () => setOptionsState(options),
					},
				});
				setSearchValue("");
				setOptionsDisabled(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[options, labelKey, action, optionsDisabled, otherDataForAction, name]
	);

	// SEARCH ENTER KEY HANDLING
	const handlingKye = useCallback(
		(e) => {
			switch (e.keyCode) {
				case 13:
					e.preventDefault();
					if (e.target.value !== "" && (get(action, "create", false) || get(action, "edit", false))) createButtonHandling(e.target.value);
			}
			bodyOnKeyDownHandling(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[createButtonHandling, action]
	);

	const bodyOnKeyDownHandling = useCallback(
		(e) => {
			switch (e.keyCode) {
				case 13:
					if (!get(action, "create", false)) selectHandling(optionsState[selectOptionWithArrow]);
					break;
				case 40:
					// Down arrow
					if (optionsState.length - 1 > selectOptionWithArrow) {
						// selectOptionWithArrow.current++;
						setSelectOptionWithArrow((s) => ++s);
					}
					break;

				case 38:
					// Up arrow
					e.preventDefault();
					if (selectOptionWithArrow > 0) {
						// selectOptionWithArrow.current--;
						setSelectOptionWithArrow((s) => --s);
					}
					break;
				default:
					break;
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[optionsState, selectOptionWithArrow, action]
	);

	let clickDelete = useCallback(
		() => {
			const index = dropDownRef.current.getAttribute("index");
			const id = dropDownRef.current.getAttribute("id");
			if (index && !isMulti) {
				let value = options?.find((item) => item[valueKey]?.toString() === id);
				if (value) {
					actionOptions({
						attributes: {
							...value,
							id,
							nam: value[labelKey],
							method: "DELETE",
							...otherDataForAction,
						},
						url: action.url,
						cb: {
							success: (res) => {
								let options = get(res, "data", []);
								getActionValue({ options, name });
								if (!isEmpty(options)) {
									// options = getSelectOptionsListFromData(options, "id", "name");
									setOptionsState(options);
								}
							},
							fail: () => setOptionsState(options),
						},
					});
				}
			} else if (isNumber("")) {
				//  this place for multi select
			}
			removeDropDown();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[options, valueKey, labelKey, action]
	);

	let clickRename = useCallback(() => {
		const index = dropDownRef.current.getAttribute("index");
		removeDropDown();
		if (index && !isMulti) {
			let value = options[index];
			setOptionsDisabled(value[valueKey]);
			setSearchValue(value[labelKey]);
		} else if (isMulti) {
			//  this place for multi select
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options, valueKey, labelKey]);

	let clickChangeColor = useCallback(({ optionsIndex, selectedIndex }) => {
		removeDropDown();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const clickHeader = useCallback(
		(e) => {
			if (!disabled) {
				!viewSelectOption && setPosition(headerRef.current.getBoundingClientRect());
				setViewSelectOption((state) => !state);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[disabled, viewSelectOption, headerRef]
	);

	useEffect(() => {
		if (!isEmpty(options)) setOptionsState(options);
		else if (isEmpty(options) && !isEmpty(optionsState)) setOptionsState(options);
		if (onChangeCallWhenChangeOptions) {
			onChange(null);
			onChangeWithoutController(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options]);

	useEffect(() => {
		if (isMulti) {
			if (!isEmpty(defaultValue) && !isNull(defaultValue)) {
				const defaultItems = getItemsWithIds(defaultValue, options, valueKey);
				isChangeDefaultValue && onChange([...defaultValue], defaultItems);
				onChangeWithoutController([...defaultValue], defaultItems);

				setSelected(options?.filter((val) => !!defaultValue?.find((i) => i == get(val, valueKey))));
				setOptionsState(() =>
					options?.map((item) =>
						defaultValue?.find((i) => i == get(item, valueKey)) ? { ...item, isSelected: true } : { ...item, isSelected: false }
					)
				);
			} else if (isNull(defaultValue)) {
				setSelected([]);
			}
		} else if (isNull(defaultValue) && !isEmpty(selected)) setSelected("");
		else if (!isEmpty(defaultValue) || isNumber(defaultValue)) {
			let value = options?.find((i) => i[valueKey] == (isArray(defaultValue) ? head(defaultValue) : defaultValue));
			isChangeDefaultValue && onChange(get(value, valueKey, null), value);
			onChangeWithoutController(get(value, valueKey, null), value);
			let selectedData = value ?? "";
			selected !== selectedData && setSelected(selectedData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue, options]);

	useEffect(() => {
		let values = isMulti ? [] : {};
		// if (isMulti && isArray(value)) values = options?.filter((val) => !!value?.find((i) => i == get(val, valueKey)));
		if (isMulti && isArray(value)) {
			values = value?.map((id) => options?.find((item) => item[valueKey] === id));
			setSelected(values ?? "");
		} else {
			const index = options?.findIndex((i) => i[valueKey] == (isArray(value) ? head(value) : value));
			setSelected(get(options, `[${index}]`) ?? "");
			setSelectOptionWithArrow(index);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		if (viewSelectOption && searchValue) {
			setSearchValue("");
			setOptionsState(options);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [viewSelectOption]);

	const clickOutside = useCallback(() => {
		if (viewSelectOption && isMulti) {
			setViewSelectOption(false);
			if (!isEmpty(selected) || defaultValue) {
				onClose((isArray(selected) && [...selected.map((item) => item[valueKey])]) || selected);
			}
		} else if (viewSelectOption && !isMulti) {
			setViewSelectOption(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [viewSelectOption, isMulti, selected, defaultValue]);

	return (
		<SelectStyled
			{...{
				...props,
				action: action.create || action.edit || action.delete ? "true" : null,
				optionsDisabled: optionsDisabled ? "true" : "",
				active: viewSelectOption ? "active" : "",
				checked: checked ? checked : "",
				error: error ? "error" : "",
				defaultHideAnimation,
				isFixed,
				bodyHeight: bodyRef.current?.offsetHeight,
				position,
			}}
			className={`select ${viewSelectOption ? "active" : ""} ${isMulti ? "multi" : ""} ${className ? className : ""}`}
		>
			<div ref={headerRef} className={`select__header ${!isMulti && !isEmpty(selected) && "optionSelected"} ${disabled && "disabled"}`}>
				<CustomHeader
					{...{
						isMulti,
						maxShowSelected,
						selected,
						defaultValue,
						placeholder,
						CustomIcon,
						options,
						headerTitle,
						isClearAll,
						clearAll,
						clickHeader,
						valueKey,
						labelKey,
						selectHandling,
					}}
				/>
			</div>
			<div ref={bodyRef} className={`${viewSelectOption && "active"} select__body ${isMulti && "multi"}`}>
				{viewSelectOption && !disabled && (
					<OutsideClickHandler onOutsideClick={clickOutside}>
						<div>
							{optionTitle && <div className="select__body__options__title">{optionTitle}</div>}
							{!isEmpty(selected) && (
								<div className="select__body__options__selected">
									{isMulti && (
										<MultiLabel
											{...{
												data: selected,
												undo: undoSelected,
												selected,
												defaultValue,
												options,
												action,
												editable,
												clickDelete,
												clickRename,
												clickChangeColor,
												isFixed,
												valueKey,
												labelKey,
											}}
										/>
									)}
								</div>
							)}
							{!isSearchable && viewSelectOption && (!get(action, "create") || options.length <= 19) && (
								<input type="text" onKeyDown={bodyOnKeyDownHandling} autoFocus={!isSearchable && viewSelectOption} className="none-input" />
							)}

							{isSearchable && (get(action, "create") || options.length > 19) && (
								<div className="select__body__options__search">
									<input
										type="text"
										autoFocus={viewSelectOption}
										ref={(inputElement) => inputElement && viewSelectOption && inputElement.focus()}
										className="select__body__options__search__input"
										placeholder={searchPlaceholder}
										value={searchValue}
										onChange={searchChange}
										onKeyDown={handlingKye}
									/>
								</div>
							)}
							<CustomOption
								{...{
									options: optionsState,
									isMulti,
									selectHandling,
									selected,
									action,
									nullable,
									searchValue,
									disabledSomeOptions,
									ignoreOption,
									valueKey,
									labelKey,
									CustomDropDownIcon,
									dropDownRef,
									dropdownConfig,
									selectOptionWithArrow,
									bodyRef,
									disabledIds,
								}}
							/>

							{action.create && isEmpty(optionsState) && !isEmpty(searchValue) && (
								<div className="select__body__options__footer" onClick={() => createButtonHandling(searchValue)}>
									<div className="select__body__options__footer__button">+ create</div>
								</div>
							)}
						</div>
						<CustomActionDropDown
							reff={dropDownRef}
							{...{
								clickRename,
								clickDelete,
								clickChangeColor,
								isFixed,
								action,
								isMulti
							}}
						/>
					</OutsideClickHandler>
				)}
			</div>
		</SelectStyled>
	);
};

export default memo(Select);
