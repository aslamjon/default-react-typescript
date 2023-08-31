import authReducer from "pages/auth/authSlice";
import settingsReducer from "pages/settings/settingsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	auth: authReducer,
	settings: settingsReducer,
});

const persistConfig = {
	key: "storage",
	whitelist: ["auth", "settings"],
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
