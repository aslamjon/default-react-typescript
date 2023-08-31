import axios from "axios";
import config from "config";
// import storage from "services/local-storage";
import { get } from "lodash";
// import { customHistory } from "router/CustomBrowserRouter";
// import type { AxiosRequestConfig } from "axios";
import store from "services/store/configure";
import { logout } from "pages/auth/authSlice";

const request = axios.create({
	baseURL: config.API_ROOT,
	params: {},
});

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

request.interceptors.request.use(
	(config) => {
		if (!config.headers?.Authorization) {
			// const token = get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "auth", null)), "token", null) || null;
			const token = get(store.getState(), "auth.token");
			if (token && config.headers) {
				config.headers.Authorization = `${get(token, "tokenType")} ${get(token, "accessToken")}`;
			}
		}
		if (config.headers) config.headers.TimeZone = timezone;
		return config;
	},
	(error) => {}
);

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const statusCode = get(error, "response.status");

		if (
			statusCode === 401
			// && config.isProduction
		) {
			store.dispatch(logout());
			// console.log(customHistory.location);
			// customHistory.push("/");
			// store.dispatch({ type: AuthAction.CHECK_AUTH.FAILURE });
		}

		return Promise.reject(error);
	}
);

export default request;
