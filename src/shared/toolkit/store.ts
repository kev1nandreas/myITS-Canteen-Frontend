import { configureStore } from "@reduxjs/toolkit";
import authorized from "./slice/authorized_slice";
import { sidebar } from "./slice/sidebar_slice";

export const store = configureStore({
	reducer: {
		authorized,
		sidebar: sidebar.reducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
