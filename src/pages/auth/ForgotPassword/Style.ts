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
	.form-input {
		margin-bottom: 15px;
	}
	button {
		width: 100%;
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
