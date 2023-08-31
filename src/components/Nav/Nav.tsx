import React, { useEffect, useState } from "react";
import { get, isNumber } from "lodash";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { NavStyle } from "./NavStyle";
import Flex from "components/Flex";
import Button from "components/Button";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { logout } from "pages/auth/authSlice";
import { tProps } from "interfaces";

let isFirst = true;
const Nav = ({ t }: tProps) => {
	const [fireColor, setFireColor] = useState("#90a4ae");
	const user = useAppSelector((state) => get(state, "auth.user", ""));
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isFirst && isNumber(get(user, "numberOfAttempts"))) {
			setFireColor("	#ff9a00");
		}
		isFirst = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [get(user, "numberOfAttempts")]);

	return (
		<NavStyle>
			<ul>
				<li>
					<NavLink to="/">Tags</NavLink>
				</li>
			</ul>
			<Flex justify="flex-end" align="center" gap="10px">
				<span className="firstName">{get(user, "firstName")}</span>

				<Flex align="center" className="numberOfAttempts">
					<svg viewBox="0 0 18 18" width="1em" height="1em" fill={fireColor} className="fire">
						<path
							fillRule="evenodd"
							d="M7.19 1.564a.75.75 0 0 1 .729.069c2.137 1.475 3.373 3.558 3.981 5.002l.641-.663a.75.75 0 0 1 1.17.115c1.633 2.536 1.659 5.537.391 7.725-1.322 2.282-3.915 2.688-5.119 2.688-1.177 0-3.679-.203-5.12-2.688-.623-1.076-.951-2.29-.842-3.528.109-1.245.656-2.463 1.697-3.54.646-.67 1.129-1.592 1.468-2.492.337-.895.51-1.709.564-2.105a.75.75 0 0 1 .44-.583zm.784 2.023c-.1.368-.226.773-.385 1.193-.375.997-.947 2.13-1.792 3.005-.821.851-1.205 1.754-1.282 2.63-.078.884.153 1.792.647 2.645C6.176 14.81 7.925 15 8.983 15c1.03 0 2.909-.366 3.822-1.94.839-1.449.97-3.446.11-5.315l-.785.812a.75.75 0 0 1-1.268-.345c-.192-.794-1.04-2.948-2.888-4.625z"
							clipRule="evenodd"
						></path>
					</svg>
					{get(user, "numberOfAttempts")}
				</Flex>
				<Button
					className="logout_btn"
					success
					onClick={() => {
						dispatch(logout());
					}}
				>
					{t("log_out") ?? "log_out"}
				</Button>
			</Flex>
		</NavStyle>
	);
};

export default withTranslation()(Nav);
