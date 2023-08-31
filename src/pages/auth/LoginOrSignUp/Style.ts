import styled, { css } from "styled-components";

export default styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;

	h2 {
		font-size: 32px;
		font-weight: 500;
		margin-bottom: 20px;
	}

	form {
		width: 400px;
		max-width: calc(100% - 30px);
		.input-container {
			margin: 6px 0 12px 0;
		}
		button {
			width: 100%;
			margin-top: 15px;
			height: 35px;
		}
	}
	${({ theme }) =>
		theme.mode === "dark" &&
		css`
			form {
				.input-container {
					background-color: var(--text);
					input {
						color: var(--white);
					}
				}
			}
		`}
`;
