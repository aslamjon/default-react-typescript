import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { get } from "lodash";
import { toast } from "react-toastify";

import Api from "./api";
interface requestOptions {
	url: string;
	body?: any;
	method?: string;
	config?: AxiosRequestConfig;
	isNotify?: boolean;
	success?: (data: any, res: AxiosResponse) => void;
	fail?: (data: any, response: AxiosResponse | any, error?: AxiosError | unknown, errCode?: string) => void;
}
export const request = async ({
	url,
	body,
	method = "get",
	config,
	success = () => "",
	fail = (err, res, error, errCode) => {},
	isNotify = true,
}: requestOptions) => {
	try {
		const res = await Api.request(url, body, method, config);
		success(res?.data, res);

		get(res, "data.message") && isNotify && toast.success(get(res, "data.message"));
	} catch (error) {
		const err = error as AxiosError;
		fail(err?.response?.data, err?.response, error, err?.code);
		if (err?.code === "ERR_NETWORK") return toast.error("Network Error");
		isNotify && toast.error(get(err, "response.data.error", ""));
	}
};
export const getAll = Api.getAll;

export default Api.request;
