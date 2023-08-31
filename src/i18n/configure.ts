import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { get } from "lodash";
import config from "config";
// import storage from "../services/local-storage";
// import { tryCatch } from "utils";
import { tokenInterface } from "pages/auth/interfaces";

const options = (lang: string, token: tokenInterface | null): InitOptions => {
	return {
		fallbackLng: lang,
		// tryCatch(() => get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "settings", null)), "lang", config.DEFAULT_LANG_CODE)) || "uz",
		// whitelist: ["uz", "ru", "en"],
		ns: ["pdp"],
		defaultNS: "pdp",
		keySeparator: false,
		interpolation: {
			escapeValue: true,
			formatSeparator: ",",
		},
		react: {
			useSuspense: false,
		},
		backend: {
			customHeaders: {
				Authorization: `${get(token, "tokenType")} ${get(token, "accessToken")}`,
				// Authorization: `${get(get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "auth", null)), "token", null), "tokenType")} ${get(
				// 	get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "auth", null)), "token", null),
				// 	"accessToken"
				// )}`,
			},
			loadPath: `${config.API_ROOT}auth/v1/language/languages/{{lng}}`,
			addPath: `${config.API_ROOT}auth/v1/language/set-key/{{lng}}`,
		},
		saveMissing: true,
	};
};

const i18config = (lang: string, token: tokenInterface | null) => {
	i18n.use(Backend).use(initReactI18next).init(options(lang, token));
	return i18n;
};
export default i18config;
