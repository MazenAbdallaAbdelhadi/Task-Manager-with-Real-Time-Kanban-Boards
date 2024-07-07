import authSlice from "@/features/auth/authSlice";
import boardSlice from "@/features/board/boardSlice";
import { modalSlice } from "@/features/modal";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
  board: boardSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
