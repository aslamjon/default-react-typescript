import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authInterface, tokenInterface, userInterface } from "./interfaces";

const initialState: authInterface = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	token: null,
	test: 2,
};

const signUpSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setTokens: (state, action: PayloadAction<tokenInterface>) => {
			state.token = action.payload;
			state.isAuthenticated = true;
		},
		setUser: (state, action: PayloadAction<userInterface>) => {
			state.user = action.payload;
			state.isLoading = false;
		},
		logout: (state, action: PayloadAction) => {
			state.isLoading = false;
			state.token = null;
			state.isAuthenticated = false;
			state.user = null;
		},
		increaseNumberOfAttempts: (state, action: PayloadAction) => {
			if (state.user) {
				state.user.numberOfAttempts++;
			}
		},
		test: (state, action: PayloadAction<number>) => {
			state.test = action.payload;
		},
	},
});

export default signUpSlice.reducer;
export const { loading, setTokens, logout, setUser, test, increaseNumberOfAttempts } = signUpSlice.actions;
