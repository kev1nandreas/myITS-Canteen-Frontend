import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthorizedState = {
	Status: boolean;
	Role: string | null;
};
const initialState = {
	Status: false,
	Role: null,
} as AuthorizedState;

export const authorized = createSlice({
	name: "authorized",
	initialState,
	reducers: {
		reset: () => initialState,
		changeAuthorized: (
			state: AuthorizedState,
			action: PayloadAction<AuthorizedState>,
		) => {
			const { Status, Role } = action.payload;
			state.Status = Status !== undefined ? Status : state.Status;
			state.Role = Role !== undefined ? Role : state.Role;
		},
	},
});
export const { changeAuthorized, reset } = authorized.actions;
export default authorized.reducer;
