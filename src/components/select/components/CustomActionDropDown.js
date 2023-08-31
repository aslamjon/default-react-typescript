import { memo } from "react";
import Icon from "../../icon";
import styled, { css } from "styled-components";
import { get } from "lodash";

const DropDownStyle = styled.div`
	.drop-down-dots {
		${({ color = "rgba(69, 178, 107, 0.1)" }) =>
			color &&
			css`
				background: ${color};
				height: 100%;
				display: flex;
				align-items: center;
				border-radius: 5px 0 0 5px;
				opacity: 0.8;

				.ui__icon__wrapper {
					.icon {
						background-color: #fcfcfd;
					}
				}

				&:hover {
					opacity: 0.9 !important;
				}
			`}
	}
	.dropDown {
		.dropDown__body {
			top: 10px;
		}
		&.isFixed {
			.dropDown__body {
				right: -20px;
				left: auto;
				top: auto;
				overflow: unset;
				min-width: 150px;
				z-index: 999 !important;
			}
		}
	}
`;

const CustomActionDropDownn = ({
	action,
	color,
	clickDelete,
	clickRename,
	clickChangeColor,
	optionsIndex,
	selectedIndex,
	isMulti,
	isFixed = false,
	options,
	value,
	label,
	reff,
	dropdownConfig,
}) => {
	// const [clientXY, setClientXY] = useState({});
	return (
		<DropDownStyle color={color} ref={reff} className="select__dropdown">
			{action?.delete && (
				<div
					className="select__dropdown__option"
					onClick={() => {
						clickDelete({ optionsIndex, selectedIndex, options });
					}}
				>
					<Icon icon="icon-recycle" color="#EF466F" mainClassName="notClose" /> Delete
				</div>
			)}

			{action?.edit && (
				<div className="select__dropdown__option" onClick={() => clickRename({ optionsIndex, selectedIndex, options })}>
					<Icon icon="icon-edit" color="#777E90" mainClassName="notClose" /> Rename
				</div>
			)}

			{/* {action?.edit && isMulti && (
				<div className="select__dropdown__option" onClick={() => setState((s) => ({ showColorPicker: true }))}>
					<Icon icon="icon-change-color" color="#777E90" mainClassName="notClose" /> Change color
				</div>
			)} */}
			{get(action, "items", []).map((Item, index) => (
				<Item key={index + Math.floor(Math.random() * 999999)} options={options} optionsIndex={optionsIndex} {...{ value, label }} />
			))}
		</DropDownStyle>
	);
};

export default memo(CustomActionDropDownn);
