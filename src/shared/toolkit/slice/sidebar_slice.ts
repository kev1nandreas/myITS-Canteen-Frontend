import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SidebarState = {
  isOpen: boolean;
};
const initialState = {
  isOpen: false,
} as SidebarState;

export const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    reset: () => initialState,
    setSidebarState: (state: SidebarState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});
export const { setSidebarState, reset } = sidebar.actions;
export default sidebar.reducer;
