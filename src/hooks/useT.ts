import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useT = (docs: { [key: string]: string }) => {
	const { t, ready } = useTranslation();

	return {
		t: (name: string, defaultValue: string) => t(name, { defaultValue: get(docs, name, defaultValue) }) ?? get(docs, name, defaultValue),
		ready,
	};
};
