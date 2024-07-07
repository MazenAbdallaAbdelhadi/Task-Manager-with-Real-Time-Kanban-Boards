import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/rootReducer";
import { Board } from "@/types/board";
import { arrayMove } from "@dnd-kit/sortable";

interface BoardState {
  selectedBoard: Board | null;
}

const initialState: BoardState = {
  selectedBoard: null,
};

type SwapColAction = {
  column1: string;
  column2: string;
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    selectBoard: (state, action: PayloadAction<Board>) => {
      state.selectedBoard = action.payload;
    },
    unselectBoard: (state) => {
      state.selectedBoard = null;
    },
    swapCols: (state, action: PayloadAction<SwapColAction>) => {
      const col1Index = state.selectedBoard?.columns.findIndex(
        (c) => c._id === action.payload.column1
      );
      const col2Index = state.selectedBoard?.columns.findIndex(
        (c) => c._id === action.payload.column2
      );

      if (
        state.selectedBoard &&
        col1Index !== undefined &&
        col2Index !== undefined
      ) {
        state.selectedBoard.columns = arrayMove(
          state.selectedBoard?.columns!,
          col1Index,
          col2Index
        );
      }
    },
  },
});

export const { selectBoard, unselectBoard, swapCols } = boardSlice.actions;

export const selectSelectedBoard = (state: RootState) =>
  state.board.selectedBoard;

export default boardSlice.reducer;
