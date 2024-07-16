import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/rootReducer";
import { BoardModal, ColumnModal } from "@/features/board";
import { ProfileModal } from "../profile";

// Define Modal Types Using an Enum
export enum ModalType {
  BOARD_MODAL = "BOARD_MODAL",
  COLUMN_MODAL = "COLUMN_MODAL",
  TASK_MODAL = "TASK_MODAL",
  PROFILE_MODAL = "PROFILE_MODAL",
}

export type ModalMode = "CREATE" | "UPDATE" | "DELETE";

// Map Modal Types to Components
const modalComponents = {
  [ModalType.BOARD_MODAL]: BoardModal,
  [ModalType.COLUMN_MODAL]: ColumnModal,
  [ModalType.TASK_MODAL]: null,
  [ModalType.PROFILE_MODAL]: ProfileModal,
};

interface ModalState {
  modalType: ModalType | null;
  modalMode?: ModalMode | null;
  modalProps: any;
}

const initialState: ModalState = {
  modalType: null,
  modalMode: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; mode?: ModalMode; props?: any }>
    ) => {
      state.modalType = action.payload.type;
      state.modalMode = action.payload.mode || null;
      state.modalProps = action.payload.props || {};
    },
    closeModal: (state) => {
      state.modalType = null;
      state.modalMode = null;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalType = (state: RootState) => state.modal.modalType;
export const selectModalMode = (state: RootState) => state.modal.modalMode;
export const selectModalProps = (state: RootState) => state.modal.modalProps;
export const selectIsOpen = (name: ModalType) => (state: RootState) =>
  state.modal.modalType === name;
export const selectModalComponent = (state: RootState) =>
  modalComponents[state.modal.modalType as ModalType] || null;

export default modalSlice.reducer;
