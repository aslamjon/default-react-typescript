import { childrenProps } from "interfaces";
import { align, direction, justify } from "interfaces/style";
import { useMemo } from "react";

interface flexOptions {
	justify?: justify;
	align?: align;
	direction?: direction;
	gap?: string;
	mt?: string;
	mb?: string;
	ml?: string;
	mr?: string;
	wrap?: string;
	className?: string;
	style?: any;
}

const Flex = ({ children, justify, align, direction, gap, mt, mb, ml, mr, className, wrap, style }: childrenProps & flexOptions) => {
	const styled = useMemo(
		() => ({
			display: "flex",
			justifyContent: justify || "flex-start",
			alignItems: align || "flex-start",
			flexDirection: direction || "row",
			gap: gap || "0px",
			marginTop: mt || "unset",
			marginBottom: mb || "unset",
			marginRight: mr || "unset",
			marginLeft: ml || "unset",
			flexWrap: wrap || "no-wrap",
		}),
		[justify, align, direction, gap, mt, mb, ml, mr, wrap]
	);
	return (
		<div style={{ ...styled, ...style }} className={className}>
			{children}
		</div>
	);
};

export default Flex;
