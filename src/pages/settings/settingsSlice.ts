import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { settings } from "./interfaces";

const initialState: settings = {
	lang: "uz",
	isSidebarOpen: true,
	mode: "light",
};

const settinsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setLang: (state, action: PayloadAction<string>) => {
			state.lang = action.payload;
		},
		setSidebar: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
		setMode: (state, action: PayloadAction<"light" | "dark">) => {
			state.mode = action.payload;
		},
	},
});

export default settinsSlice.reducer;
export const { setLang, setSidebar, setMode } = settinsSlice.actions;
