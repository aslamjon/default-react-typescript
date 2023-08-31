import React, { memo, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { includes } from "lodash";

const ModalStyled = styled.div`
	${({ className }) =>
		includes(className, "modal") &&
		css`
			width: 0vw;
			height: 0vh;
			background: #f4f4f480;
			z-index: -1000;
			position: fixed;
			top: 50%;
			left: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			/* align-items: ${({ center }) => (center ? "center" : "flex-start")}; */

			.modal {
				&__body {
					min-width: 350px;
					min-height: 300px;
					max-height: 95vh;
					overflow-y: auto;
					padding: 20px;
					transform: scale(0);
					opacity: 0;
					background: #fcfcfc;
					box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1);
					backdrop-filter: blur(16px);
					border-radius: 16px;
					transition: all 0.2s linear;
					margin: 0 20px;
				}
			}

			${({ width }) =>
				width &&
				css`
					.modal {
						&__body {
							width: ${width}px;
						}
					}
				`}
			${({ active }) =>
				active &&
				css`
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;

					.modal {
						&__body {
							transform: scale(1);
							opacity: 1;
						}
					}

					z-index: 1000;
				`}
		`}
`;

const Modal = ({ children, className = "", active = false, onClose = () => {}, ...props }) => {
	let ref = useRef(null);

	useEffect(() => {
		function eventFunc(e) {
			if (ref.current === e.target) if (active) onClose();
			if (!active) e.stopPropagation();
		}

		active && document.addEventListener("click", eventFunc);
		return () => document.removeEventListener("click", eventFunc);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	return (
		<ModalStyled
			ref={ref}
			{...{
				className: `modal ${className} ${active && "active"}`,
				active,
				...props,
			}}
		>
			<div className={`modal__body ${active && "active"}`}>{children}</div>
		</ModalStyled>
	);
};

export default memo(Modal);
