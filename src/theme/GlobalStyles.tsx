import "react-toastify/dist/ReactToastify.css";
// import 'assets/css/style.css';
import "assets/css/colors.css";
import "assets/css/icons.css";
import "assets/css/static.css";
import "assets/css/animation.css";
// import 'assets/css/sizes.css';

import { createGlobalStyle, css } from "styled-components";

// import "../assets/css/tooltip.css";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fcfcfd inset;
    box-shadow: 0 0 0 30px #fcfcfd inset;
    border-radius: 10px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  body {
    font-weight: 400;
    font-size: 16px;
    color: #353945;
    /* background: #f7f7fa; */

    line-height: 1.5;
    font-family: "Poppins", sans-serif;

    /* hech qayerda ishlatilmagan */

    /* & > #datepicker__root + div {
      &>div{
        z-index: 10;
      }
    } */
  }

	.layout {
		padding: 20px;
		min-height: 100vh;
	}



	.uploader {
		width: 400px;
		border-radius: 20px;
		background-color: #d8d9df;
		overflow: hidden;
		height: 2px;
		&-wrapper {
			width: 400px;
			min-width: 400px;
			display: flex;
			gap: 5px;
			justify-content: space-betwee;
			align-items: center;
		}
		&__child {
			height: 2px;
			width: 0;
			background-color: var(--brand--color);
		}
	}

  .img-fluid {
    max-width: 100%;
    height: auto;
  }

  iframe {
    display: none !important;
  }

	.language {
		&-box {
			color: var(--white);
			font-weight: 500;
    cursor: pointer;
		&.active {
			color: var(--brand--color)
		}
		}
	}



  .Resizer {
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .position-relative {
    position: relative !important;
  }


	.pagination {
	display: flex;
	list-style: none;
}
.pagination li {
	border: 1px solid var(--border);
	color: var(--green);
	background-color: var(--white);
	height: 38px;
	min-width: 35px;
	&.previous {
		border-radius: 6px 0 0 6px;
	}
	&.next {
		border-radius: 0 6px 6px 0;
	}
}
.pagination li a {
	padding: 5px 8px;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	outline: none;
}
.pagination li.selected {
	color: var(--white);
	background-color: var(--green);
}

${({ theme }) =>
	theme.mode === "dark" &&
	css`
		body {
			background-color: var(--dark-bg-color);
			color: var(--white);
		}
		.pagination li {
			background-color: var(--dark-bg-color);
			border: 1px solid var(--lighter-green);
		}
	`}


  @media print {
    .no-print,
    .no-print * {
      display: none !important;
    }
  }

  .grid-body-box {
    height: 100%;
  }

  .btn-border-radius-8 {
    button,
    a {
      border-radius: 8px;
    }
  }
  .btn-border-radius-4 {
    button,
    a {
      border-radius: 4px;
    }
  }

  .box {
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e6e8ec;
  }
  .table-border {
    border: 1px solid #d8d9df;
  }
  .shadow {
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  }

  .init-loader-bg {
    background: rgba(0, 0, 0, 0.2);
  }

  .Toastify__progress-bar {
    opacity: 0 !important;
  }

  .simplebar-horizontal-only {
    .simplebar-track {
      &.simplebar-vertical {
        display: none !important;
      }
    }
    .simplebar-content-wrapper {
      overflow-y: hidden !important;
    }

    .simplebar-scroll-content {
      padding-right: 0 !important;
      overflow-y: hidden;
    }

    .simplebar-content {
      margin-right: 0 !important;
    }
  }

  //  animation: rotate 1s infinite;
  .grid-view-header {
    position: sticky;
    top: 0;
    left: 0;
    background: #fff;
  }

  .beauty__scrollbar__div {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      transition: all 4s ease;
      border-radius: 8px;
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .beauty__scrollbar__div2 {
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 6px 0 0 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 6px 0 0 6px;
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .Toastify__toast-container--bottom-left {
    left: 30px;
    position: absolute;
  }


	.ant-modal-header {
		margin-bottom: 20px !important;
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


	@media (max-width: 400px) {
		.layout {
			padding: 10px;
		}
	}
  /* &[data-title] {
          position: relative;
        }
        &[data-title]:hover::after {
          content: attr(data-title);
          position: absolute;
          width: 180px;
          min-height: 35px;
          font-size: 12px;
          bottom: -69%;
          right: 0;
          background-color: #222;
          color: #fff;
          border-radius: 5px;
          padding: 10px;
          z-index: 3;
        }
        &[data-title]:hover::before {
          content: "";
          border-top: 10px solid transparent;
          border-bottom: 10px solid #222;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          position: absolute;
          bottom: -11%;
          right: calc((180px / 2) - 10px);
          z-index: 1;
        } */
  /* [data-title]:hover::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: calc((200px / 2) - 5px);
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
      background-color: #222;
      border-radius: 10%;
      z-index: 1;
    } */
`;
