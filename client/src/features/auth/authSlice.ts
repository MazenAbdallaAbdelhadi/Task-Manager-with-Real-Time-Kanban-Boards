import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "@/store/rootReducer";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

export const useUser = () => useSelector((state: RootState) => state.auth.user);
export const useIsAuthenticated = () =>
  useSelector((state: RootState) => state.auth.isAuthenticated);
export const useIsAdmin = () =>
  useSelector((state: RootState) => state.auth.user?.role) === 1;
