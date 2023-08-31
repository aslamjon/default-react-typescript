import styled, { css } from "styled-components";

export default styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	form {
		width: 400px;
		max-width: calc(100vw - 20px);
	}
	input[type="number"] {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			/* display: none; <- Crashes Chrome on hover */
			-webkit-appearance: none;
			margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
		}
		-moz-appearance: textfield; /* Firefox */
	}
	button {
		width: 100%;
		margin-top: 15px;
	}
	.input-container {
		margin: 6px 0 12px 0;
	}

	.title {
		font-size: 18px;
		margin-bottom: 20px;
		font-weight: 500;
	}
	${({ theme }) =>
		theme.mode === "dark" &&
		css`
			.input-container {
				background-color: var(--text);
				input {
					color: var(--white);
				}
				&:after {
					background-color: var(--text);
				}
			}
		`}
`;
