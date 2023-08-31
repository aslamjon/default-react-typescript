import { childrenType } from "interfaces";
import React, { Ref, forwardRef } from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";

type StyledInitialLoaderProps = {
	flexDirection?: string;
	gap?: string;
	ref?: Ref<HTMLDivElement> | undefined;
};
interface InitialLoaderProps extends StyledInitialLoaderProps {
	children?: childrenType;
}

const StyledInitialLoader = styled.div<StyledInitialLoaderProps>`
	width: 100%;
	height: 100vh;
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	align-items: center;
	justify-content: center;
	flex-direction: ${({ flexDirection }) => flexDirection || "inherit"};
	gap: ${({ gap }) => gap || 0};
	background-color: rgba(0, 0, 0, 0.2);
`;

const InitialLoader = forwardRef<HTMLDivElement, InitialLoaderProps>(({ children, flexDirection, gap, ...rest }, ref) => {
	return (
		<StyledInitialLoader ref={ref} {...{ ...rest, flexDirection, gap }}>
			<PuffLoader size={100} color={"var(--brand--color)"} />
			{children}
		</StyledInitialLoader>
	);
});

export default InitialLoader;
