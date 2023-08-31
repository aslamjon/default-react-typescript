import styled, { css } from "styled-components";

export const SelectStyled = styled.div`
	position: relative;
	.select {
		min-width: 100px;
		position: relative;

		&__header {
			min-height: 38px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #fcfcfd;
			/* border: 1px solid #e6e8ec; */
			box-sizing: border-box;
			border-radius: 8px;
			cursor: pointer;
			transition: 0.2s;
			position: relative;

			${({ error }) =>
				css`
					border: 1px solid ${error === "error" ? "#EF466F" : "#e6e8ec"};
				`}

			&__content {
				width: 100%;
				height: 100%;
				font-weight: normal;
				font-size: 16px;
				line-height: 24px;
				color: #353945;
				padding: 4px 10px;
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				left: 0;
				width: 86%;
				&.multi {
					.select__header__content__text {
						line-height: unset;
					}
				}
				&__text {
					line-height: 28px;
					max-height: 100%;
					display: inline-block;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					max-width: 100%;
				}
			}

			.multiValueList {
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;
				max-height: 100% !important;

				.multiValue {
					height: 100%;
					display: flex;
					margin: 0 5px 0 0px;
					border-radius: 2px 10px 10px 2px;
					padding: 2px 8px 2px 6px;
					position: relative;

					.drop-down-dots {
						height: 27px;
						animation: hideAnim 0ms forwards;
						position: absolute;
						top: -2px;
						right: 2px;
					}

					.exitBtn {
						animation: hideAnim 0ms forwards;
						/* overflow: hidden; */
						margin-left: 4px;
						border-radius: 2px 10px 10px 2px;
						position: absolute;
						right: 0;
						top: 0px;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 27px;

						.ui__icon__wrapper {
							width: 15px;
							border-radius: 2px 10px 10px 2px;
							margin-bottom: 1px;

							.icon {
								background: #fcfcfd;
								width: 17px !important;
								height: 17px !important;
							}
						}

						&:after {
							content: "";
							width: 10px;
							height: 100%;
							position: absolute;
							top: 0;
							left: -10px;
							background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
						}
					}

					&:hover {
						border-radius: 2px 10px 10px 2px;
						/* padding: 2px 23px 2px 6px; */

						.drop-down-dots {
							animation: showAnim 0ms forwards;
						}

						.exitBtn {
							animation: showAnim 0ms forwards;
							padding: 0 1px;
							padding-right: 3px;
						}
					}
				}
			}

			&__selectedNumber {
				min-width: 25px;
				min-height: 25px;
				background: #d8dde8;
				font-weight: bold;
				font-size: 12px;
				line-height: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
				border-radius: 50%;
				position: absolute;
				right: 10px;
			}

			&__iconContainer {
				position: absolute;
				right: 10px;
				height: 100%;
				display: flex;
				align-items: center;
			}

			&__clearAll {
				height: 40px;
				background: #3772ff;
				border-radius: 6px;
				font-weight: 500;
				font-size: 16px;
				line-height: 24px;
				text-align: center;
				text-transform: uppercase;
				color: #ffffff;
				padding: 8px 16px;
				display: flex;
				align-items: center;
				position: absolute;
				right: 5px;
				cursor: pointer;
				transition: 0.2s;

				&:hover {
					opacity: 0.9;
				}
			}
		}

		&__body {
			z-index: 999999;
			background: #ffffff;
			border: 1px solid #e6e8ec;
			box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
			border-radius: 8px;
			max-height: 250px;
			overflow-y: scroll;
			position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
			animation: showAnim 0.1s forwards;
			visibility: collapse;
			opacity: 0;

			&.active {
				visibility: visible;
				opacity: 1;
				width: ${({ position }) => position?.width || 200}px;
				padding: 5px 4px 10px 10px;
			}

			&.active.multi {
				.select__body__options__selected {
					.multiValueList {
						display: flex;
						flex-wrap: wrap;
						overflow: hidden;

						.multiValue {
							display: flex;
							margin: 0 5px 5px 5px;
							border-radius: 2px 10px 10px 2px;
							padding: 2px 8px 2px 6px;
							position: relative;

							.drop-down-dots {
								animation: hideAnim 0ms forwards;
							}

							.exitBtn {
								animation: hideAnim 0ms forwards;
								/* overflow: hidden; */
								margin-left: 4px;
								border-radius: 2px 10px 10px 2px;
								position: absolute;
								right: 0;
								top: 2px;
								display: flex;
								align-items: center;
								justify-content: center;
								height: 24px;

								.ui__icon__wrapper {
									width: 15px;
									border-radius: 2px 10px 10px 2px;
									margin-bottom: 1px;

									.icon {
										background: #fcfcfd;
										width: 17px !important;
										height: 17px !important;
									}
								}

								&:after {
									content: "";
									width: 10px;
									height: 100%;
									position: absolute;
									top: 0;
									left: -10px;
									background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
								}
							}

							&:hover {
								border-radius: 2px 10px 10px 2px;

								.exitBtn {
									animation: showAnim 0ms forwards;
									padding: 0 1px;
									padding-right: 3px;
								}

								.drop-down-dots {
									animation: showAnim 0ms forwards;
								}
							}
						}
					}
				}
			}

			.dropDown {
				&__button {
					position: absolute;
					top: -17px;
					right: 8px;
					z-index: 2;
				}

				&__body {
					padding: 8px 12px;
					z-index: 10;
					min-width: 140px;
					z-index: 10;

					.dropdown__option {
						display: flex;
						align-items: center;
						padding: 4px 0;
						font-weight: 500;
						font-size: 12px;
						line-height: 12px;
						letter-spacing: -0.01em;
						color: #353945;
						cursor: pointer;

						.notClose {
							margin-right: 6px;

							.icon {
								width: 18px !important;
								height: 18px !important;
							}
						}
					}
				}
			}

			${({ position, isFixed, bodyHeight }) =>
				position &&
				(isFixed
					? css`
							top: ${position?.bottom + (bodyHeight + 10) > window.innerHeight
								? window.innerHeight - (bodyHeight + 10)
								: position?.bottom + 10 || 0}px;
							left: ${position?.left || 0}px;
					  `
					: css`
							top: ${position?.bottom + 260 > window.innerHeight
								? position?.height - (position?.bottom + 260 - window.innerHeight)
								: position?.height + 10}px;
					  `)}

			::-webkit-scrollbar {
				width: 6px;
			}
			::-webkit-scrollbar-thumb {
				border-radius: 6px 1px 1px 6px;
			}

			&:hover {
				::-webkit-scrollbar-thumb {
					background-color: #777e91;
				}
			}

			.select__body__options {
				box-sizing: border-box;
				border-radius: 8px;
				background: #fff;
				border: none;
				padding-right: 8px;

				&::-webkit-scrollbar {
					width: 0 !important;
				}

				&__selected {
					min-height: 0;
					/* overflow: hidden; */
				}

				&__title {
					font-weight: 500;
					font-size: 12px;
					line-height: 18px;
					color: #777e91;
					padding: 6px 7px;
					border-radius: 8px 8px 0px 0px;
				}

				&__search {
					box-sizing: border-box;
					margin-bottom: 10px;
					/* position: sticky;
        top: 0; */
					background: #ffffff;

					input {
						background: none;
						background: #f4f5f6;
						border-radius: 6px;
						border: none;
						outline: none;
						width: 100%;
						padding: 10px 6px 9px 6px;
						padding-left: 10px;
						font-weight: normal;
						font-size: 14px;
						line-height: 21px;
						color: #353945;

						&::placeholder {
							color: #b1b5c4;
						}
					}
				}

				&__option {
					display: flex;
					justify-content: space-between;
					font-weight: normal;
					font-size: 14px;
					line-height: 21px;
					color: #353945;
					margin-bottom: 5px;
					padding: 7px 0 7px 10px;
					border-radius: 8px;
					border: 1px solid transparent;
					.content {
						cursor: pointer;
						width: 100%;
						background: none;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					&.selectedWithArrow {
						border: 1px solid var(--brand--color);
					}

					&.disabled {
						color: #9e9e9e;
						cursor: not-allowed;

						.content {
							cursor: not-allowed;
						}
					}

					${({ optionsDisabled }) =>
						optionsDisabled &&
						css`
							background: #777e9129;
							cursor: not-allowed;

							.content {
								cursor: not-allowed;
							}
						`}
				}

				&__empty {
					width: 100%;
					height: 100%;
					text-align: center;
					font-size: 14px;
					padding: 40px 0 45px;
				}

				&__footer {
					position: absolute;
					bottom: 10px;
					left: 10px;

					&__button {
						cursor: pointer;
						font-size: 14px;
						font-weight: 500;
						line-height: 1;
						color: #7c828d;
					}
				}
			}

			.colorPicker-container {
				position: fixed;
				top: 105px;
				right: 30px;
				width: 224px;
				height: 145px;
				background: #fcfcfd;
				box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
				border-radius: 8px;
				.circle-picker {
					position: absolute;
					//top: 60px;
					//right: 30px;
					top: 33px;
					right: 16px;
				}

				.styled-chrome-picker {
				}
			}
		}

		&__dropdown {
			padding: 8px 12px;
			z-index: 1000000;
			min-width: 140px;
			background: var(--white);
			border: 1px solid #e6e8ec;
			box-shadow: 0 8px 16px rgb(145 158 171 / 24%);
			position: absolute;
			border-radius: 4px;
			transform: scale(0);
			transition: 0.1s;
			&__option {
				display: flex;
				align-items: center;
				padding: 4px 0;
				font-weight: 500;
				font-size: 12px;
				line-height: 12px;
				letter-spacing: -0.01em;
				color: #353945;
				cursor: pointer;

				.notClose {
					margin-right: 6px;

					.icon {
						width: 18px !important;
						height: 18px !important;
					}
				}
			}
			&.active {
				animation: showAnim 0.2s forwards;
			}
		}

		&.active.multi {
			.select__body {
				&__options__selected {
					.multiValueList {
						display: flex;
						flex-wrap: wrap;
						overflow: hidden;

						.multiValue {
							display: flex;
							margin: 0 5px 5px 5px;
							border-radius: 2px 10px 10px 2px;
							padding: 2px 8px 2px 6px;
							position: relative;

							.drop-down-dots {
								animation: hideAnim 0ms forwards;
							}

							.exitBtn {
								animation: hideAnim 0ms forwards;
								/* overflow: hidden; */
								margin-left: 4px;
								border-radius: 2px 10px 10px 2px;
								position: absolute;
								right: 0;
								top: 2px;
								display: flex;
								align-items: center;
								justify-content: center;
								height: 24px;

								.ui__icon__wrapper {
									width: 15px;
									border-radius: 2px 10px 10px 2px;
									margin-bottom: 1px;

									.icon {
										background: #fcfcfd;
										width: 17px !important;
										height: 17px !important;
									}
								}

								&:after {
									content: "";
									width: 10px;
									height: 100%;
									position: absolute;
									top: 0;
									left: -10px;
									background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
								}
							}

							&:hover {
								border-radius: 2px 10px 10px 2px;

								.exitBtn {
									animation: showAnim 0ms forwards;
									padding: 0 1px;
									padding-right: 3px;
								}

								.drop-down-dots {
									animation: showAnim 0ms forwards;
								}
							}
						}
					}
				}
			}
		}

		&.active {
			.select__header {
				border: 1px solid #45b36b;
			}

			.select__body {
				animation: showAnim 0.1s forwards;
			}
		}
	}

	.none-input {
		width: 0;
		height: 0;
		border: none;
		outline: none;
		position: absolute;
	}

	${({ theme }) =>
		theme.mode === "dark" &&
		css`
			.select {
				&__header {
					background: var(--dark-bg-color);
					border: 1px solid var(--lighter-green);
					&__content {
						color: var(--white);
					}
				}
				&__body {
					background: var(--dark-bg-color);
					border: 1px solid var(--lighter-green);
					&__options {
						&__option {
							.content {
								color: var(--white) !important;
							}
						}
					}
				}
			}
		`}
`;

export const BodyStyled = styled.div`
	width: ${({ position }) => position?.width || 200}px;
	z-index: 999999;
	background: #ffffff;
	border: 1px solid #e6e8ec;
	box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
	border-radius: 8px;
	padding: 5px 4px 10px 10px;
	max-height: 250px;
	overflow-y: scroll;
	position: fixed;
	animation: showAnim 0.1s forwards;

	&.active.multi {
		.select__body__options__selected {
			.multiValueList {
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;

				.multiValue {
					display: flex;
					margin: 0 5px 5px 5px;
					border-radius: 2px 10px 10px 2px;
					padding: 2px 8px 2px 6px;
					position: relative;

					.drop-down-dots {
						animation: hideAnim 0ms forwards;
					}

					.exitBtn {
						animation: hideAnim 0ms forwards;
						/* overflow: hidden; */
						margin-left: 4px;
						border-radius: 2px 10px 10px 2px;
						position: absolute;
						right: 0;
						top: 2px;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 24px;

						.ui__icon__wrapper {
							width: 15px;
							border-radius: 2px 10px 10px 2px;
							margin-bottom: 1px;

							.icon {
								background: #fcfcfd;
								width: 17px !important;
								height: 17px !important;
							}
						}

						&:after {
							content: "";
							width: 10px;
							height: 100%;
							position: absolute;
							top: 0;
							left: -10px;
							background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
						}
					}

					&:hover {
						border-radius: 2px 10px 10px 2px;

						.exitBtn {
							animation: showAnim 0ms forwards;
							padding: 0 1px;
							padding-right: 3px;
						}

						.drop-down-dots {
							animation: showAnim 0ms forwards;
						}
					}
				}
			}
		}
	}
	.dropDown {
		&__button {
			position: absolute;
			top: -17px;
			right: 8px;
			z-index: 2;
		}

		&__body {
			padding: 8px 12px;
			z-index: 10;
			min-width: 140px;
			z-index: 10;

			.dropdown__option {
				display: flex;
				align-items: center;
				padding: 4px 0;
				font-weight: 500;
				font-size: 12px;
				line-height: 12px;
				letter-spacing: -0.01em;
				color: #353945;
				cursor: pointer;

				.notClose {
					margin-right: 6px;

					.icon {
						width: 18px !important;
						height: 18px !important;
					}
				}
			}
		}
	}

	${({ position }) =>
		position &&
		css`
			top: ${position?.bottom + 260 > window.innerHeight ? window.innerHeight - 260 : position?.bottom + 10 || 0}px;
			left: ${position?.left || 0}px;
		`}

	::-webkit-scrollbar {
		width: 6px;
	}
	::-webkit-scrollbar-thumb {
		border-radius: 6px 1px 1px 6px;
	}

	&:hover {
		::-webkit-scrollbar-thumb {
			background-color: #777e91;
		}
	}

	.select__body__options {
		box-sizing: border-box;
		border-radius: 8px;
		background: #fff;
		border: none;
		padding-right: 8px;

		&::-webkit-scrollbar {
			width: 0 !important;
		}

		&__selected {
			min-height: 0;
			/* overflow: hidden; */
		}

		&__title {
			font-weight: 500;
			font-size: 12px;
			line-height: 18px;
			color: #777e91;
			padding: 6px 7px;
			border-radius: 8px 8px 0px 0px;
		}

		&__search {
			box-sizing: border-box;
			margin-bottom: 10px;
			/* position: sticky;
        top: 0; */
			background: #ffffff;

			input {
				background: none;
				background: #f4f5f6;
				border-radius: 6px;
				border: none;
				outline: none;
				width: 100%;
				padding: 10px 6px 9px 6px;
				padding-left: 10px;
				font-weight: normal;
				font-size: 14px;
				line-height: 21px;
				color: #353945;

				&::placeholder {
					color: #b1b5c4;
				}
			}
		}

		&__option {
			display: flex;
			justify-content: space-between;
			font-weight: normal;
			font-size: 14px;
			line-height: 21px;
			color: #353945;
			margin-bottom: 5px;
			padding: 7px 0 7px 10px;
			border-radius: 8px;

			.content {
				cursor: pointer;
				width: 100%;
				background: none;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&.disabled {
				color: #9e9e9e;
				cursor: not-allowed;

				.content {
					cursor: not-allowed;
				}
			}

			${({ optionsDisabled }) =>
				optionsDisabled &&
				css`
					background: #777e9129;
					cursor: not-allowed;

					.content {
						cursor: not-allowed;
					}
				`}
		}

		&__empty {
			width: 100%;
			height: 100%;
			text-align: center;
			font-size: 14px;
			padding: 40px 0 45px;
		}

		&__footer {
			position: absolute;
			bottom: 10px;
			left: 10px;

			&__button {
				cursor: pointer;
				font-size: 14px;
				font-weight: 500;
				line-height: 1;
				color: #7c828d;
			}
		}
	}

	.colorPicker-container {
		position: fixed;
		top: 105px;
		right: 30px;
		width: 224px;
		height: 145px;
		background: #fcfcfd;
		box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
		border-radius: 8px;
		.circle-picker {
			position: absolute;
			//top: 60px;
			//right: 30px;
			top: 33px;
			right: 16px;
		}

		.styled-chrome-picker {
		}
	}
`;
