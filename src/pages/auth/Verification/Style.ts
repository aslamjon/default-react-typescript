import styled from "styled-components";

const Styled = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	--ReactInputVerificationCode-itemWidth: 60px;
	--ReactInputVerificationCode-itemHeight: 60px;

	.ReactInputVerificationCode__item {
		&.is-active {
			box-shadow: inset 0 0 0 1px var(--green);
		}
	}

	button {
		width: 100%;
		margin-top: 15px;
	}
	form {
		max-width: calc(100% - 30px);
	}
	.ReactInputVerificationCode__container {
		width: 100%;
		gap: 20px;
	}
	@media (max-width: 450px) {
		.ReactInputVerificationCode__container {
			gap: 10px;
		}
	}
`;

export default Styled;
