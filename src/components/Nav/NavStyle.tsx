import styled, { css } from "styled-components";

export const NavStyle = styled.nav`
	padding-bottom: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	ul {
		list-style: none;
		li {
			a {
				text-decoration: none;
				color: var(--dark, #292929);
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				transition: 250ms;
				&:hover {
					color: var(--green);
				}

				${({ theme }) =>
					theme.mode === "dark" &&
					css`
						color: var(--white);
					`}
			}
		}
	}
	.numberOfAttempts {
		font-size: 14px;
		svg {
			font-size: 18px;
		}
	}
`;
