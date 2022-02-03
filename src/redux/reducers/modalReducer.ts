import { createReducer } from "@reduxjs/toolkit";
import { closeModalAction, showModalAction } from "../actions/modalActions";

interface IModalAction {
  payload: string;
  type: string;
}

export const initialModalState = {
  modalClosed: false,
  openedModal: "",
};

function showModal(state: typeof initialModalState, action: IModalAction) {
  state.openedModal = action.payload;
  state.modalClosed = false;
}

function closeModal(state: typeof initialModalState) {
  state.openedModal = "";
  state.modalClosed = true;
}

export const modalReducer = createReducer(initialModalState, (builder) => {
  builder.addCase(showModalAction, showModal);
  builder.addCase(closeModalAction, closeModal);
});
