import { I18nextProvider } from "react-i18next";
import { childrenProps } from "interfaces";
import configure from "./configure";
import { useAppSelector } from "services/hooks";

const I18n = ({ children }: childrenProps) => {
	const lang = useAppSelector((state) => state.settings.lang);
	const token = useAppSelector((state) => state.auth.token);

	return <I18nextProvider i18n={configure(lang, token)}>{children}</I18nextProvider>;
};

export default I18n;
