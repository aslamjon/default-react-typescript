import { childrenProps } from "interfaces";
import { get } from "lodash";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./main";

const LayoutManager = ({ children }: childrenProps) => {
	const { pathname } = useLocation();

	const getLayout = useCallback((pathname: string): string => {
		if (pathname === "/") {
			return "main";
		}

		// if (pathname.startsWith("/redirect")) {
		// 	return "open";
		// }

		// if (/^\/auth(?=\/|$)/i.test(pathname)) {
		// 	return "auth";
		// }

		return "main";
	}, []);

	const getLayouts = useMemo(
		() => ({
			main: MainLayout,
			// auth: AuthLayout,
			// open: OpenLayout,
		}),
		[]
	);

	const Layout = get(getLayouts, `${getLayout(pathname)}`);
	return <Layout>{children}</Layout>;
};

export default LayoutManager;
