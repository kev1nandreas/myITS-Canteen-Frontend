import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthorizedState = {
	Status: boolean;
	Name: string | null;
	Role: string | null;
};
const initialState = {
	Status: false,
	Role: null,
	Name: null,
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
			const { Status, Role, Name } = action.payload;
			state.Status = Status !== undefined ? Status : state.Status;
			state.Role = Role !== undefined ? Role : state.Role;
			state.Name = Name !== undefined ? Name : state.Name;
		},
	},
});
export const { changeAuthorized, reset } = authorized.actions;
export default authorized.reducer;
