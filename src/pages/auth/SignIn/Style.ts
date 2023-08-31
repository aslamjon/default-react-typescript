import styled, { css } from "styled-components";

export default styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	form {
		width: 300px;
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

	.login-form-forgot {
		color: #1677ff;
		cursor: pointer;
		transition: color 0.3s;
	}
	button {
		width: 100%;
		margin-top: 15px;
	}
	.input-container {
		margin: 6px 0 12px 0;
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
