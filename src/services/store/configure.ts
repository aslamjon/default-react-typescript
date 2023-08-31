import { persistStore } from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";

import persistedReducer from "./redusers";
import config from "config";

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: !config.isProduction,
});

let persistor = persistStore(store);

export default store;
export { persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
