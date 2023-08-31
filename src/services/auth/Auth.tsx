import { InitialLoader } from "components/loaders";
import { childrenProps } from "interfaces";
import { get } from "lodash";
import { loading, logout, setUser } from "pages/auth/authSlice";
import { userInterface } from "pages/auth/interfaces";
import { useEffect } from "react";
import { request } from "services/api";
import { useAppDispatch, useAppSelector } from "services/hooks";

const Auth = ({ children }: childrenProps) => {
	const dispatch = useAppDispatch();
	const persist = useAppSelector((state) => get(state, "_persist.rehydrated"));
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const token = useAppSelector((state) => state.auth.token);

	useEffect(() => {
		if (persist) {
			dispatch(loading(true));
			request({
				url: "auth/v1/auth/me",
				isNotify: false,
				success: ({ data }: { data: userInterface }) => {
					dispatch(setUser(data));
				},
				fail: (err, res, e) => {
					if (get(res, "status", null) === 401 && get(res, "status", null) === 403) {
						dispatch(logout());
						return;
					}
					dispatch(loading(false));
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [persist, token]);

	return <>{isLoading ? <InitialLoader /> : children}</>;
};

export default Auth;
