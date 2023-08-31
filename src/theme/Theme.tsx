import { childrenProps } from "interfaces";
import { ThemeProvider } from "styled-components";
import { get } from "lodash";

import GlobalStyles from "./GlobalStyles";
import { useAppSelector } from "services/hooks";

const Theme = ({ children }: childrenProps) => {
	const mode = useAppSelector((state) => get(state, "settings.mode"));

	return (
		<ThemeProvider theme={{ mode }}>
			<>
				<GlobalStyles />
				{children}
			</>
		</ThemeProvider>
	);
};

export default Theme;
