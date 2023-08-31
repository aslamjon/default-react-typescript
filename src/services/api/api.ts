import axios, { AxiosRequestConfig } from "axios";
import RequestApi from "./axiosConfig";
import { isEqual } from "lodash";

let tokens: { [key: string]: any } = {};

const checkToken = (name: string) => {
	if (tokens[name]) tokens[name].cancel("Operation canceled by the user.");

	tokens[name] = axios.CancelToken.source();
};

const getConfigWithToken = (name: string, config: AxiosRequestConfig = {}) => ({
	...config,
	cancelToken: tokens[name].token,
});

class Api {
	static getAll = (url: string, config: AxiosRequestConfig, method = "get") => {
		if (isEqual(method, "post") || isEqual(method, "POST")) return RequestApi.post(url, config);

		checkToken(url);
		return RequestApi.get(url, getConfigWithToken(url, config));
	};

	static getOne = (url: string, config: AxiosRequestConfig) => {
		checkToken(url);
		return RequestApi.get(url, getConfigWithToken(url, config));
	};

	static getData = (url: string, config: AxiosRequestConfig, method = "post") => {
		if (isEqual(method, "get") || isEqual(method, "GET")) {
			checkToken(url);
			return RequestApi.get(url, getConfigWithToken(url, config));
		}
		return RequestApi.post(url, config);
	};

	static operationAdd = (url: string, attributes: any) => RequestApi.post(url, attributes);

	static operationDelete = (url: string, config: AxiosRequestConfig) => RequestApi.delete(url, config);

	static operationUpdate = (url: string, attributes: any, method = "put") => {
		if (isEqual(method, "patch") || isEqual(method, "PATCH")) return RequestApi.patch(url, attributes);
		return RequestApi.put(url, attributes);
	};

	static request = (url: string, attributes: any, method = "get", config?: AxiosRequestConfig) => {
		if (isEqual(method, "patch") || isEqual(method, "PATCH")) return RequestApi.patch(url, attributes);

		if (isEqual(method, "put") || isEqual(method, "PUT")) return RequestApi.put(url, attributes, config);

		if (isEqual(method, "delete") || isEqual(method, "DELETE")) return RequestApi.delete(url, { data: attributes });

		if (isEqual(method, "post") || isEqual(method, "POST")) return RequestApi.post(url, attributes, config);

		checkToken(url);
		return RequestApi.get(url, getConfigWithToken(url, config));
	};
}

export default Api;
