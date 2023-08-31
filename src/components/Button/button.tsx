import React, { forwardRef, memo } from "react";
import classNames from "classnames";
import Style from "./buttonStyle";
import { childrenType } from "interfaces";

interface buttonOptions {
	children: childrenType;
	type?: "button" | "submit" | "reset" | undefined;
	className?: string;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	hideClickAnimation?: boolean;
}

export type buttonStyleOptions = {
	outline?: boolean;
	success?: boolean;
	outlineSuccess?: boolean;
	outlineDanger?: boolean;
	danger?: boolean;
	hideClickAnimation?: boolean;
};

type buttonRef = ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null | undefined;

const Button = forwardRef(
	(
		{
			children,
			type,
			className = "",
			onClick = () => {},
			disabled = false,
			hideClickAnimation = false,
			outlineDanger,
			...props
		}: buttonOptions & buttonStyleOptions,
		ref?: buttonRef
	) => {
		return (
			<Style
				className={classNames(className, {
					disabled,
				})}
				{...{
					disabled,
					hideClickAnimation,
					outlineDanger,
				}}
				onClick={(e) => !disabled && onClick(e)}
				type={type ? type : "button"}
				disabled={disabled}
				ref={ref}
				{...props}
			>
				{children}
			</Style>
		);
	}
);
export default memo(Button);
